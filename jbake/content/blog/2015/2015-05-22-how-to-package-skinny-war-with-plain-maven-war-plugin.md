---
title: How to package skinny war with plain maven-war-plugin
date: 2015-05-22
tags:
  - maven
---

If you are not using maven EAR plugin, then you can also use plain maven-war-plugin to package a Skinny war package like this:
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>2.6</version>
                <configuration>
                    <!--
                    We want to package skinny war to avoid third party jars -->
                    <packagingExcludes>
                        WEB-INF/lib/*.jar
                    </packagingExcludes>
                    <archiveClasses>true</archiveClasses>
                </configuration>
            </plugin>

However, if you ran into the problem I described in [last post](http://saltnlight5.blogspot.com/2015/05/getting-version-string-from-maven-based.html), then you want a Skinny war, but still want to include the jar it produced from your own web project. In this case, you can try this:

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>2.6</version>
                <configuration>
                    <!--
                    We want to package skinny war to avoid third party jars, but we do want the classes from
                    this project to be included -->
                    <packagingExcludes>
                        %regex[WEB-INF/lib/(?!my-project-artifact-name-.*\.jar).*\.jar]
                    </packagingExcludes>
                    <archiveClasses>true</archiveClasses>
                </configuration>
            </plugin>

The plugin would accept a REGEX expression for exclusion as well, but getting it to work might take you a few tries! If you need more than this, try this online Java REGEX testing tool: [http://www.regexplanet.com/advanced/java/index.html](http://www.regexplanet.com/advanced/java/index.html)