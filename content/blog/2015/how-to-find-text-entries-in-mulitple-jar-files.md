Title: How to find text entries in mulitple jar files
Date: 2015-07-22 00:00:00-05:00
Tags: java


Similar to [printjar](https://zemian.github.io/2012/07/how-to-print-text-file-content-inside.html)utility, here is a findjar util that can comes in handy to verify whether a class exists or not among a pile of jar files.

JavaScript (run with jrunscript command)

```
pattern = arguments[arguments.length -1];
for (i=0; i < arguments.length - 1; i++) {
    path = arguments[i];
    jar = new java.util.jar.JarFile(path)
    entries = jar.entries();
    while(entries.hasMoreElements()) {
        jarEntry = entries.nextElement();
        if (jarEntry.toString().search(pattern) != -1) {
            println(jarEntry + " : " + path);
        }
    }
    jar.close();
}
```

Jython

```
import sys, glob, re
from java.util.jar import JarFile
pattern = sys.argv[-1]
for name in sys.argv[1: -2]:
    for path in glob.glob(name):
        jar = JarFile(path)
        for e in jar.entries():
            if re.search(pattern, str(e)):
                print "%s %s" % (str(e), path)
        jar.close()
```

Java version (The search argument input is at position one in this example)

```
import java.io.File;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public class findjar {
    public static void main(String[] args) throws Exception {
        String searchText = args[0];
        if (searchText.contains("."))
            searchText = searchText.replaceAll("\\.", "/");
        String dir = args[1];
        System.out.println("Searching " + searchText + " in " + dir);
        search(searchText, new File(dir));
        System.out.println("Done.");
    }

    private static void search(String searchText, File dir) throws Exception {
        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.isFile() && file.getName().endsWith(".jar")) {
                JarFile jarFile = new JarFile(file);
                Enumeration<JarEntry> entries = jarFile.entries();
                while(entries.hasMoreElements()) {
                    JarEntry e = entries.nextElement();
                    String name = e.getName();
                    if (name.indexOf(searchText) >= 0) {
                        System.out.println("Found: " + name + " in " + jarFile.getName());
                    }
                }
                jarFile.close();
            } else if (file.isDirectory()){
                search(searchText, file);
            }
        }
    }
}
```

