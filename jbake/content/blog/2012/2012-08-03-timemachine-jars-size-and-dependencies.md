---
title: TimeMachine jars size and dependencies
date: 2012-08-03
tags:
  - timemachine
---

From the [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler/downloads) download page you will see that the latest 1.2.1 release zip package size is around 13M. It may seem large for a scheduler application, but let's examine it closely to see what's in there. Here is how the zip package looks like inside

    timemachine-scheduler-1.2.1
    +-- bin
    +-- lib
    +-- config
    

The `config` directory contains many sample configurations and scripts to help new users get started. The `bin` contains few startup wrapper scripts that let you start the scheduler. The `lib` contains the libraries for the scheduler application. I want to go into more details on these.

    +-- lib
    -rw-r--r--@  1 zemian  staff   445288 Jun 20 23:20 antlr-2.7.7.jar
    -rw-r--r--@  1 zemian  staff   610790 Jun 20 23:26 c3p0-0.9.1.2.jar
    -rw-r--r--@  1 zemian  staff   109043 Jun 20 23:20 commons-io-1.4.jar
    -rw-r--r--@  1 zemian  staff   279193 Jun 20 23:20 commons-lang-2.5.jar
    -rw-r--r--@  1 zemian  staff   313898 Jun 20 23:26 dom4j-1.6.1.jar
    -rw-r--r--@  1 zemian  staff  6156866 Aug  2 22:05 groovy-all-2.0.0.jar
    -rw-r--r--@  1 zemian  staff  1267149 Jun 20 23:26 h2-1.3.163.jar
    -rw-r--r--@  1 zemian  staff    81271 Jun 20 23:26 hibernate-commons-annotations-4.0.1.Final.jar
    -rw-r--r--@  1 zemian  staff  4407494 Jun 20 23:26 hibernate-core-4.1.3.Final.jar
    -rw-r--r--@  1 zemian  staff   102661 Jun 20 23:26 hibernate-jpa-2.0-api-1.0.1.Final.jar
    -rw-r--r--@  1 zemian  staff   648253 Jun 20 23:26 javassist-3.15.0-GA.jar
    -rw-r--r--@  1 zemian  staff    60768 Jun 20 23:26 jboss-logging-3.1.0.GA.jar
    -rw-r--r--@  1 zemian  staff    11209 Jun 20 23:26 jboss-transaction-api_1.1_spec-1.0.0.Final.jar
    -rw-r--r--@  1 zemian  staff   481535 Jun 20 23:20 log4j-1.2.16.jar
    -rw-r--r--@  1 zemian  staff    25496 Jun 20 23:20 slf4j-api-1.6.1.jar
    -rw-r--r--@  1 zemian  staff     9753 Jun 20 23:20 slf4j-log4j12-1.6.1.jar
    -rw-r--r--@  1 zemian  staff    46885 Aug  2 22:37 timemachine-hibernate-1.2.1.jar
    -rw-r--r--@  1 zemian  staff   154925 Aug  2 22:36 timemachine-scheduler-1.2.1.jar
    

The core of the scheduler `timemachine-scheduler-1.2.1.jar` would only need `slf4j-api-1.6.1.jar`, `commons-io-1.4.jar` and `commons-lang-2.5.jar` to run. These would support full scheduler with in memory data store. As you can see these add up to only about 500K! 

To be able to see useful logging output, you need an SLF4j impl. You may use built-in JDK's logger if you choose, or you may use `slf4j-log4j12-1.6.1.jar` and `log4j-1.2.16.jar`. I personally think the JDK logger is horrible to use and configure, so I package up log4j as option for you.

A Java scripting engine is only optional in TimeMachine, and JDK already comes with JavaScript. To be practical, I also package the Groovy engine `groovy-all-2.0.0.jar`. It's much more easy to use. But the full groovy engine is costing us 6M in size!

The TimeMachine allows you to switch data store service. We provided the `HibernateDataService` service in `timemachine-scheduler-1.2.1.jar`. This service would require the Hibernate dependencies, which is pretty heavy. They are: `hibernate-*.jar`, `jboss-*.jar`, `javassist-3.15.0-GA.jar`, `antlr-2.7.7.jar`, and `dom4j-1.6.1.jar`. These can add up to another 5M in size!

Now with the Hibernate data service, you would also need a database driver that match to your database. I have included a H2Database, a Java database that provides full SQL database service including its driver in `h2-1.3.163.jar`. This alone is about 1.2M in size.

When you working with Hibernate and Database, you should always use a Database connection pool. I packaged the `c3p0-0.9.1.2.jar` implementation which Hibernate can automatically detects.

I hope these information can help you decide what to remove or add in case you want to customize your scheduler to fit into your application. You may also visit the project to see the Maven site dependencies report that has all the details. This also means that if you use Maven to bring in TimeMachine scheduler as dependency, you will automatically gets the minimal because I have carefully set all the optional items not to be included with the proper Maven scopes.