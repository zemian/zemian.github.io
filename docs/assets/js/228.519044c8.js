(window.webpackJsonp=window.webpackJsonp||[]).push([[228],{610:function(e,t,r){"use strict";r.r(t);var n=r(10),i=Object(n.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("p",[e._v("The two most frequent type of classpath URL we get when get it through\n"),r("code",[e._v("ClassLoader#getResource(resourceName)")]),e._v(" is either "),r("code",[e._v("file")]),e._v(" or "),r("code",[e._v("jar")]),e._v("\nentries. If we want to walk a resources that are stored in a directory,\nthen we need to parse these differently. For "),r("code",[e._v("file")]),e._v(", it’s easy to do\nsince we have "),r("code",[e._v("java.io.File")]),e._v(". As for "),r("code",[e._v("jar")]),e._v(", we would use "),r("code",[e._v("JarFile")]),e._v(". Here\nis a implementation.")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[e._v('public static void walkClasspathResDir(ClassLoader cl, String resDir, ConsumerEx<FileStream> fileConsumer) {\n        // NOTE: JarEntry.isDirectory() used below requires input to ends with slash.\n        if (!resDir.endsWith("/")) {\n            resDir = resDir + "/";\n        }\n\n        URL url = cl.getResource(resDir);\n        if (url == null) {\n            throw new AppException("Resource directory " + resDir + " not found in classpath.");\n        } else if ("file".equals(url.getProtocol())) {\n            File dir = new File(url.getPath());\n            if (!dir.isDirectory()) {\n                throw new AppException("Resource is not a directory: " + resDir);\n            }\n            walkFileDir(dir, fileConsumer);\n        } else if ("jar".equals(url.getProtocol())) {\n            try {\n                JarURLConnection conn = (JarURLConnection) url.openConnection();\n                if (!(conn.getJarEntry().isDirectory())) {\n                    throw new AppException("Resource is not a directory: " + resDir);\n                }\n                walkJarEntryDir(conn.getJarFile(), resDir, fileConsumer);\n            } catch (Exception e) {\n                throw new AppException("Unable to read resource: " + url, e);\n            }\n        } else {\n            throw new AppException("Unsupported protocol " + url.getProtocol() + " for checking resource directory.");\n        }\n    }\n\n    public static void walkFileDir(File dir, ConsumerEx<FileStream> fileConsumer) {\n        try {\n            Files.walkFileTree(dir.toPath(), new SimpleFileVisitor<Path>() {\n                @Override\n                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {\n                    try (FileInputStream stream = new FileInputStream(file.toFile())) {\n                        try {\n                            String shortPath = file.toFile().getPath().substring(dir.getPath().length());\n                            // Always convert path separator to Unix\n                            shortPath = FilenameUtils.separatorsToUnix(shortPath);\n                            // Remove leading \'/\' if there is any\n                            if (shortPath.startsWith("/")) {\n                                shortPath = shortPath.substring(1);\n                            }\n                            fileConsumer.accept(new FileStream(shortPath, stream));\n                        } catch (Exception e) {\n                            throw new AppException("Failed to process file: " + file, e);\n                        }\n                    }\n                    return FileVisitResult.CONTINUE;\n                }\n            });\n        } catch (IOException e) {\n            throw new AppException("Failed to walk directory: " + dir, e);\n        }\n    }\n\n    public static void walkJarEntryDir(JarFile jarFile, String entryName, ConsumerEx<FileStream> fileConsumer) {\n        try {\n            Enumeration<JarEntry> entries = jarFile.entries();\n            while (entries.hasMoreElements()) {\n                JarEntry jarEntry = entries.nextElement();\n                if (jarEntry.getName().startsWith(entryName)) {\n                    if (!jarEntry.isDirectory()) {\n                        try (InputStream stream = jarFile.getInputStream(jarEntry)) {\n                            try {\n                                String shortPath = jarEntry.getName().substring(entryName.length());\n                                fileConsumer.accept(new FileStream(shortPath, stream));\n                            } catch (Exception e) {\n                                throw new AppException("Failed to process jar entry: " + jarEntry.getName(), e);\n                            }\n                        }\n                    }\n                }\n            }\n        } catch (IOException e) {\n            throw new AppException("Failed to walk jar directory entry: " + entryName, e);\n        }\n    }\n')])])]),r("p",[e._v("Here the "),r("code",[e._v("FileStream")]),e._v(" is just a POJO that holds a resource path name and\nthe stream that points to it. One tricky part to above code is noted in\ncomment:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[e._v("// NOTE: JarEntry.isDirectory() used below requires input to ends with slash.\n")])])]),r("p",[e._v("Now, here is how we can use it:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[e._v('        ClassLoader cl = Thread.currentThread().getContextClassLoader();\n        walkClasspathResDir(cl, "toolbox/templates/javaapp", (fileStream) -> {\n            System.out.println(fileStream.getPath() + " " + fileStream.getStream());\n        });\n        System.out.println();\n')])])])])}),[],!1,null,null,null);t.default=i.exports}}]);