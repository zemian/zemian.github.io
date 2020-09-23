title=Getting version string from a Maven based web application
date=2015-05-20
type=post
tags=maven, java
status=published
~~~~~~
When you package a maven project, it will automatically generate a pom.properties file inside that will contains the version, artifactId and groupId information. These are handy to have and to display for your web application at runtime. One can use a method like following to retrive it.

public class Application {
     private String version;

     public String getVersion() {
        if (version == null) {
            String res = "META-INF/maven/myapp/pom.properties";
            URL url = Thread.currentThread().getContextClassLoader().getResource(res);
            if (url == null) {
                version = "SNAPSHOT." + Utils.timestamp();
            } else {
                Properties props = Utils.loadProperties(res);
                version = props.getProperty("version");
            }
        }
        return version;
    }

}

Sounds good? Not too fast! Turns out you have to do little more trick to have this working properly for deployment. By default the maven war plugin will package your classes files into the WEB-INF/classes, but the pom.properties are in META-INF at the same level, and not in WEB-INF/classes/META-INF! This resulted the above code not finding your resource pom.properties from classpath!

To fix this, you need to add the following to your pom.xml file:

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>2.6</version>
                <configuration>
                    <archiveClasses>true</archiveClasses>
                </configuration>
            </plugin>

This will tell maven to jar up your classes along with the pom.properties in a separate file, then place it in WEB-INF/lib folder instead of using the unpacked WEB-INF/classes version. This forces the pom.properties to be properly added and read by our getVersion() method. 