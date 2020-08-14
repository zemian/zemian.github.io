---
title: Running maven commands with multi modules project
date: 2012-10-14
tags:
  - maven
---

Have you ever tried running Maven commands inside a sub-module of a multi modules Maven project, and get `Could not resolve dependencies for project` error msg? And you checked the dependencies that it's missing are those sister modules within the same project! So what gives? It turns out you have to give few more options to get this running correctly, and you have to remember always stays in the parent pom directory to run it!

For exmaple if you checkout the TimeMachine scheduler project, you can invoke the `timemachine-hibernate` module with maven commands like this:

    bash> hg clone https://bitbucket.org/timemachine/scheduler
    bash> cd scheduler
    bash> mvn -pl timemachine-hibernate -am clean test-compile
    

You can start the scheduler using Maven like this (remember to stay in the parent pom directory!):

    bash > mvn -pl timemachine-scheduler exec:java -Dexec.mainClass=timemachine.scheduler.tool.SchedulerServer -Dexec.classpathScope=test
    

I have added the `-Dexec.classpathScope=test` so you will see logging output, because there is an `log4j.properties` in the classpath for testing.

Without these, you can always run `mvn install` in the project root directory, then you can cd into any sub-module and run Maven commands. However you will have to keep a tab on what changed in the dependencies, even if they are in sister modules.

You can read more from this [article](http://www.sonatype.com/people/2009/10/maven-tips-and-tricks-advanced-reactor-options) from Sonatype.