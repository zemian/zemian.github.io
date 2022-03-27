Title: How to process stream and read text file in Java 8
Date: 2014-03-31 00:00:00-05:00
Tags: java


I have converted one of my old utility class using latest Java8. I use this often to print content of manifest file to check any mysterious jar file for version etc. Just run "java ztools.PrintJar /path/to/my.jar" to see output. In the new code, you will see how I use the Java 8 stream processing to filter what I need from an Enumeration list, and then get the optional result if there is any. And then the BufferedReader now comes with "lines()" method that also do streaming. It's pretty cool to see Java 8 in actions!
```
package ztools;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Optional;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * Print text based resource file inside a jar file. (eg: META-INF/MANIFEST.MF)
 * @author Zemian Deng
 */
public class PrintJar {
    public static void main(String[] args) throws Exception {
        // Search given name in a jar
        JarFile jarFile = new JarFile(args[0]);
        final String searchName = (args.length >= 2) ? args[1] : "META-INF/MANIFEST.MF";
        Optional<JarEntry> searchResult = jarFile
                .stream()
                .filter(e -> e.getName().equals(searchName))
                .findFirst();
        if (!searchResult.isPresent())
            throw new RuntimeException(searchName + " not found!");
        
        // Print the JarEntry
        JarEntry entry = searchResult.get();
        try (InputStream instream = jarFile.getInputStream(entry)) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(instream));
            reader.lines().forEach(line -> System.out.println(line));
        }
    }
}
```

