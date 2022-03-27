Title: Walk resource tree as directory in classpath
Date: 2018-01-27 00:00:00-05:00
Tags: java,classpath



The two most frequent type of classpath URL we get when get it through
`ClassLoader#getResource(resourceName)` is either `file` or `jar`
entries. If we want to walk a resources that are stored in a directory,
then we need to parse these differently. For `file`, it’s easy to do
since we have `java.io.File`. As for `jar`, we would use `JarFile`. Here
is a implementation.

    public static void walkClasspathResDir(ClassLoader cl, String resDir, ConsumerEx<FileStream> fileConsumer) {
            // NOTE: JarEntry.isDirectory() used below requires input to ends with slash.
            if (!resDir.endsWith("/")) {
                resDir = resDir + "/";
            }

            URL url = cl.getResource(resDir);
            if (url == null) {
                throw new AppException("Resource directory " + resDir + " not found in classpath.");
            } else if ("file".equals(url.getProtocol())) {
                File dir = new File(url.getPath());
                if (!dir.isDirectory()) {
                    throw new AppException("Resource is not a directory: " + resDir);
                }
                walkFileDir(dir, fileConsumer);
            } else if ("jar".equals(url.getProtocol())) {
                try {
                    JarURLConnection conn = (JarURLConnection) url.openConnection();
                    if (!(conn.getJarEntry().isDirectory())) {
                        throw new AppException("Resource is not a directory: " + resDir);
                    }
                    walkJarEntryDir(conn.getJarFile(), resDir, fileConsumer);
                } catch (Exception e) {
                    throw new AppException("Unable to read resource: " + url, e);
                }
            } else {
                throw new AppException("Unsupported protocol " + url.getProtocol() + " for checking resource directory.");
            }
        }

        public static void walkFileDir(File dir, ConsumerEx<FileStream> fileConsumer) {
            try {
                Files.walkFileTree(dir.toPath(), new SimpleFileVisitor<Path>() {
                    @Override
                    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                        try (FileInputStream stream = new FileInputStream(file.toFile())) {
                            try {
                                String shortPath = file.toFile().getPath().substring(dir.getPath().length());
                                // Always convert path separator to Unix
                                shortPath = FilenameUtils.separatorsToUnix(shortPath);
                                // Remove leading '/' if there is any
                                if (shortPath.startsWith("/")) {
                                    shortPath = shortPath.substring(1);
                                }
                                fileConsumer.accept(new FileStream(shortPath, stream));
                            } catch (Exception e) {
                                throw new AppException("Failed to process file: " + file, e);
                            }
                        }
                        return FileVisitResult.CONTINUE;
                    }
                });
            } catch (IOException e) {
                throw new AppException("Failed to walk directory: " + dir, e);
            }
        }

        public static void walkJarEntryDir(JarFile jarFile, String entryName, ConsumerEx<FileStream> fileConsumer) {
            try {
                Enumeration<JarEntry> entries = jarFile.entries();
                while (entries.hasMoreElements()) {
                    JarEntry jarEntry = entries.nextElement();
                    if (jarEntry.getName().startsWith(entryName)) {
                        if (!jarEntry.isDirectory()) {
                            try (InputStream stream = jarFile.getInputStream(jarEntry)) {
                                try {
                                    String shortPath = jarEntry.getName().substring(entryName.length());
                                    fileConsumer.accept(new FileStream(shortPath, stream));
                                } catch (Exception e) {
                                    throw new AppException("Failed to process jar entry: " + jarEntry.getName(), e);
                                }
                            }
                        }
                    }
                }
            } catch (IOException e) {
                throw new AppException("Failed to walk jar directory entry: " + entryName, e);
            }
        }

Here the `FileStream` is just a POJO that holds a resource path name and
the stream that points to it. One tricky part to above code is noted in
comment:

    // NOTE: JarEntry.isDirectory() used below requires input to ends with slash.

Now, here is how we can use it:

            ClassLoader cl = Thread.currentThread().getContextClassLoader();
            walkClasspathResDir(cl, "toolbox/templates/javaapp", (fileStream) -> {
                System.out.println(fileStream.getPath() + " " + fileStream.getStream());
            });
            System.out.println();

