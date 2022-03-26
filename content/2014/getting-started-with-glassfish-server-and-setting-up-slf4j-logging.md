---
title: Getting started with Glassfish Server and Setting up SLF4J logging
date: 2014-12-10T00:00:00-05:00
tags:
  - glassfish
  - slf4j
  - logging
---
Some notes I jot down while playing with GlassFish Server (3) for EE 6. You may get a working example here:
[https://github.com/saltnlight5/java-ee6-examples/tree/master/extra/glassfish-logging-example](https://github.com/saltnlight5/java-ee6-examples/tree/master/extra/glassfish-logging-example)
```
= Gettin started with Glassfish server

== Start server

1. cd $GF/bin
2. asadmin start-domain domain1

== Stop server

1. cd $GF/bin
2. asadmin stop-domain domain1

== Server Ports

Admin Console Application is at http://localhost:4848
 * Default setup has no user and password restriction!

Web applications is http://localhost:8080

== To create a new domain with diferent ports

1. cd $GF/bin
2. asadmin create-domain --portbase 9000 domain2

* If you accept default then again no password for admin user. After this, your
  admin console app is at http://localhost:9048 while your application is at
  http://localhost:9080

= Glassfish Server Setup

== How to setup SLF4J

1. Copy slf4j-api and slf4j-jdk jars into $GF/lib/endorsed
2. Edit $GF/domains/domain1/config/logging.properties and add your own logging package level
 mypackage.level=FINEST

== How to enable JSTL tag for all web applications

1. Copy jstl-1.2.jar into $GF/domains/domain1/lib

== How to add MySQL Driver for all applications

1. Copy mysql-connector-java-5.1.30-bin.jar into $GF/domains/domain1/lib
```
