title=Running Maven war packaging project without pom config
date=2013-08-27
type=post
tags=maven
status=published
~~~~~~

Use Jetty (latest 9.x requires JDK7)

    bash> mvn org.eclipse.jetty:jetty-maven-plugin:run -Djetty.port=8081

Or use Jetty on JDK 6

    bash> mvn org.mortbay.jetty:jetty-maven-plugin:8.1.12.v20130726:run -Djetty.port=8081

Or use Tomcat

    bash> mvn org.apache.tomcat.maven:tomcat7-maven-plugin:run -Dmaven.tomcat.port=8081