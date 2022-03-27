Title: Minimal Java webapp with Maven
Date: 2012-07-10 00:00:00-05:00
Tags: maven,java


Below are the shortest steps I know that would get you the smallest Java web application ready in Maven.

```
$ mkdir -p webapp/src/main/webapp/WEB-INF/classes
$ echo '<web-app></web-app>' > webapp/src/main/webapp/WEB-INF/web.xml
$ echo '<html>Hello World.</html>' > webapp/src/main/webapp/index.jsp
$ echo '<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>atest</groupId>
    <artifactId>webapp</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
</project>' > webapp/pom.xml
$ cd webapp
$ mvn org.apache.tomcat.maven:tomcat7-maven-plugin:2.0-beta-1:run
```

You should able to visit http://localhost:8080/webapp after that. Editing any JSP files should auto refresh by the server, and you don't need to restart it. This is a fast way to prototype and test out your ideas.

(Yes, I am aware that maven has the archetype for webapp, but it above do give you the bare minimal and you see each lines what go into your project.) 

