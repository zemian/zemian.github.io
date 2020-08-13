title=How to print text file content inside a jar file
date=2012-07-30
type=post
tags=java
status=published
~~~~~~
Have you ever wonder what's the exact version of your `ojdbc6.jar` that you have? All the jar files will contain a `META-INF/MANIFEST.MF` file, and chances are the version will be in it! You may try using `$JAVA_HOME/bin/jar -xvf` to extract the jar and then view the text file. But afterward you would have to clean up the extracted file so not to liter.

However, if you got Groovy, you can print any text file inside a jar without above mess.

    file = new File(args[0])
    name = args.size() > 1 ? args[1] : "META-INF/MANIFEST.MF"
    jar = new java.util.jar.JarFile(file)
    entry = jar.getEntry(name)
    istream = jar.getInputStream(entry)
    println(istream.text)
    istream.close()
    

You may use this script like this:

    $ groovy printjar.groovy /path/to/objdbc6.jar
    
    # Or give an explicit entry name
    $ groovy printjar.groovy $JBOSS_HOME/jboss-modules.jar 'META-INF/maven/org.jboss.modules/jboss-modules/pom.properties'

     

UPDATES:

Here are different implementations of similar program in differnet JVM based languages.

Java
```
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * Print text based resource file inside a jar file. (eg: META-INF/MANIFEST.MF)
 * 
 * @author Zemian Deng
 */
public class printjar {
    public static void main(String[] args) throws Exception {
        // Search given name in a jar
        JarFile jarFile = new JarFile(args[0]);
        final String searchName = (args.length >= 2) ? args[1]
                : "META-INF/MANIFEST.MF";

        Enumeration<JarEntry> entries = jarFile.entries();
        while (entries.hasMoreElements()) {
            JarEntry entry = entries.nextElement();
            if (entry.getName().contains(searchName)) {
                // Print the JarEntry
                InputStream instream = jarFile.getInputStream(entry);
                try {
                    BufferedReader reader = new BufferedReader(
                            new InputStreamReader(instream));
                    String line = null;
                    while ((line = reader.readLine()) != null) {
                        System.out.println(line);
                    }
                } finally {
                    if (instream != null)
                        instream.close();
                }
            }
        }
    }
}
```

JavaScript (Run it with `jrunscript` command)
```
jar = new java.util.jar.JarFile(arguments[0])
pattern = arguments[arguments.length -1];
entries = jar.entries();
while(entries.hasMoreElements()) {
    jarEntry = entries.nextElement();
    if (jarEntry.toString().search(pattern) != -1) {
        istream = jar.getInputStream(jarEntry);
        cat(istream);
        istream.close();
        break;
    }
}
jar.close();
```

Kotlin
```
import java.io.BufferedReader
import java.io.InputStreamReader
import java.util.jar.JarFile
val jarFile = JarFile(args[0])
val searchName = if (args.size() >= 2) args[1] else "META-INF/MANIFEST.MF"
for (entry in jarFile.entries()) {
    if (entry.getName().contains(searchName)) {
        jarFile.getInputStream(entry).use { it ->
            val reader = BufferedReader(InputStreamReader(it))
            for (line in reader.lineSequence())
            println(line)
        }
    }
}
```