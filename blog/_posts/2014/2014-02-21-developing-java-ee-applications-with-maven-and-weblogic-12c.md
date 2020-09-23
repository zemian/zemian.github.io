---
title: Developing Java EE applications with Maven and WebLogic 12c
date: 2014-02-21T00:00:00-05:00
tags:
  - weblogic
  - maven
---
The WebLogic Server 12c has very nice support for Maven now. The doc for this is kinda hidden though, so here is a direct link [http://docs.oracle.com/middleware/1212/core/MAVEN](http://docs.oracle.com/middleware/1212/core/MAVEN)

To summarize the doc, Oracle did not provide a public Maven repository manager hosting for their server artifacts. However they do now provide a tool for you to create and populate your own. You can setup either your local repository (if you are working mostly on your own in a single computer), or you may deploy them into your own internal Maven repository manager such as Archiva or Nexus.

Here I would show how the local repository is done. First step is use a maven plugin provided by WLS to populate the repository. I am using a MacOSX for this demo and my WLS is installed in $HOME/apps/wls12120. If you are on Windows, you may install it under C:/apps/wls12120.
```
$ cd $HOME/apps/wls12120/oracle_common/plugins/maven/com/oracle/maven/oracle-maven-sync/12.1.2/

$ mvn install:install-file -DpomFile=oracle-maven-sync.12.1.2.pom -Dfile=oracle-maven-sync.12.1.2.jar

$ mvn com.oracle.maven:oracle-maven-sync:push -Doracle-maven-sync.oracleHome=$HOME/apps/wls12120 -Doracle-maven-sync.testingOnly=false
```
The artifacts are placed under your local $HOME/.m2/repository/com/oracle. Now you may use Maven to build Java EE application with these WebLogic artifact as dependencies. Not only these are available, the push also populated some additional maven plugins that helps development more easy. For example, you can generate a template project using their archetype plugin.
```
$ cd $HOME

$ mvn archetype:generate \

    -DarchetypeGroupId=com.oracle.weblogic.archetype \

    -DarchetypeArtifactId=basic-webapp \

    -DarchetypeVersion=12.1.2-0-0 \

    -DgroupId=org.mycompany \

    -DartifactId=my-basic-webapp-project \

    -Dversion=1.0-SNAPSHOT
```
Type 'Y' to confirm to finish. Notice that pom.xml it generated; it is using the "javax:javaee-web-api:6.0:provided" dependency. This is working because we setup the repository earlier. Now you may build it. 
```
$ cd my-basic-webapp-project

$ mvn package
```
After this build you should have the war file under the target directory. You may manually copy and deploy this into your WebLogic server domain. Or you may continue to configure the maven pom to do this all with maven. Here is how I do it. Edit the my-basic-webapp-project/pom.xml file and replace the weblogic-maven-plugin plugin like this:

      <plugin>

        <groupId>com.oracle.weblogic</groupId> 

        <artifactId>weblogic-maven-plugin</artifactId> 

        <version>12.1.2-0-0</version> 

        <configuration> 

          <middlewareHome>${oracleMiddlewareHome}</middlewareHome>

          <adminurl>${oracleServerUrl}</adminurl>

          <user>${oracleUsername}</user> 

          <password>${oraclePassword}</password>

          <source>${project.build.directory}/${project.build.finalName}.${project.packaging}</source>

          <targets>${oracleServerName}</targets>

          <verbose>true</verbose> 

          <name>${project.build.finalName}</name>

        </configuration>

      </plugin>  

With this change, you may deploy the webapp into WebLogic server (well, assuming you already started your "mydomain" with "myserver" server running locally. See my previous blog for instructions)
```
$ cd my-basic-webapp-project

$ mvn weblogic:deploy -DoracleMiddlewareHome=$HOME/apps/wls12120 -DoracleServerName=myserver -DoracleUsername=admin -DoraclePassword=admin123
```
After the "BUILD SUCCESS" message, you may visit the http://localhost:7001/basicWebapp URL.

Revisit the WLS doc again and you will find that they also provide other project templates (Maven calls these archetypes) for building EJB, MDB, or WebService projects. These should help you get your EE projects started quickly. 
