---
title: How to get JAXB (xjc) to work on Maven
date: 2012-03-11T00:00:00-05:00
tags:
  - java
  - maven
---
I got it working by using the following

```
    <build>
        <plugins>
            <!-- Generate JAXB Java source files from an XSD file -->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>jaxb2-maven-plugin</artifactId>
                <version>1.3.1</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>xjc</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <packageName>my.jaxb.data</packageName>
                    <outputDirectory>${project.build.directory}/generated-source/jaxb</outputDirectory>
                    <schemaDirectory>${basedir}/src/main/resources</schemaDirectory>
                    <schemaFiles>mydata.xsd</schemaFiles>
                </configuration>
            </plugin>

            <!-- Build helper plugin adds the sources generated by the JAXB to the compile path -->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>build-helper-maven-plugin</artifactId>
                <version>1.7</version>
                <executions>      
                    <execution> 
                        <phase>process-sources</phase>
                        <configuration>
                            <sources>
                                <source>${project.build.directory}/generated-sources/jaxb</source>
                            </sources>
                        </configuration>
                        <goals>
                            <goal>add-source</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
 ```