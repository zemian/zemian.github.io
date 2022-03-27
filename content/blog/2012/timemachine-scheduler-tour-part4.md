Title: TimeMachine Scheduler Tour - Part4
Date: 2012-06-17 00:00:00-05:00
Tags: timemachine



This is part 4 of 7 in a series of articles that will give you a tour of the [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler/wiki/Home) project. These articles will introduce you to the scheduler, how to load jobs and schedules, and explore some of its advanced features. For the most current and accurate instructions, please visit the ReferenceManual from the project site.

## Developing with TimeMachine scheduler in Java

The TimeMachine scheduler is written in Java, so the primary language to extend and write custom job task is with Java as well. The obvious benefit of using Java over a Scripting language is it's speed and IDE tooling when developing.

Recall from previous tour that the scheduler allows you to create a job definition and add any schedules to be run. The actual job execution is provided by a JobTask implementation class name given to the job definition. You may write your own JobTask implementation in Java. After this, then you may write a user service that will register the job task with the scheduler. Through this user service layer, you can also implement event listeners that get invoked when scheduler runs a job, add a schedule, or delete a job def etc.

Before we start, let me show you a Java project setup using Maven3 so that you can use the rest of the tour as demo.

Let start by setup a maven project `scheduler-demo/pom.xml` file like this: 

```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>
<groupId>scheduler-demo</groupId>
<artifactId>scheduler-demo</artifactId>
<version>1.0.0-SNAPSHOT</version>

<build>
<plugins>
<plugin>
<artifactId>maven-compiler-plugin</artifactId>
<version>2.3.2</version>
<configuration>
<source>1.6</source>
<target>1.6</target>
</configuration>
</plugin>
</plugins>
</build>

<dependencies>
<dependency>
<groupId>org.bitbucket.timemachine</groupId>
<artifactId>timemachine-scheduler</artifactId>
<version>1.1.1</version>
</dependency>
<dependency>
<groupId>org.slf4j</groupId>
<artifactId>slf4j-simple</artifactId>
<version>1.6.1</version>
</dependency>
</dependencies>
</project>
```

The timemachine scheduler artifact should already in Maven central, so cd into the scheduler-demo directory and run mvn installshould get your project compiled and installed into your local repository. If you are curious, you may also run mvn dependency:tree to see what are the scheduler dependencies are. You will discover that although the scheduler uses many optional runtime dependencies, the actual compile time dependencies only have few.

## Writing JobTask in Java

Now create a new `src/main/java/schedulerdemo/MyTask.java` Java file with following:

```
package schedulerdemo;

import timemachine.scheduler.*;

import org.slf4j.*;

public class MyJobTask implements JobTask {

  public static Logger logger = LoggerFactory.getLogger(MyJobTask.class);

  public void run(JobContext jobContext) {

    logger.info("Hello, I am jobTask with " + jobContext.getSchedule());

  }

}
```

The JobTask interface is a very simple one, and the JobContext parameter would give you all the runtime information you need to query and interact with the scheduler. With above, you can immediately run the scheduler server within your maven project setup. But let's also create a scheduler 
`config/scheduler.properties` file that looks like this first:

```
# config/scheduler.properties
timemachine.scheduler.userservice.jobLoader.class = timemachine.scheduler.userservice.JobLoaderService

JobLoaderService.01myJob.schedulerdemo.MyJobTask = CronSchedule{expression=* * * * * ?}
```

Now you can run the scheduler with your config by using this maven command:

  $ mvn exec:java -Dexec.mainClass=timemachine.scheduler.tool.SchedulerServer -Dexec.args=config/scheduler.properties

## Writing User Service in Java

Continue with the setup above, you may explore more advanced features of the scheduler. The scheduler API exposes a simple way to let you customize the scheduler. Recall that the scheduler application itself is a container of many system services. The scheduler also has a separate container that holds user services only. To register, you just need to implements the timemachine.scheduler.Service interface.

Try create a new  `src/main/java/schedulerdemo/MyService.java` Java file with following:

```
package schedulerdemo;

import timemachine.scheduler.*;

import org.slf4j.*;

public class MyService implements Service {

  public static Logger logger = LoggerFactory.getLogger( MyService.class);

  public void init() { logger.info("I am initializing."); }

  public void start() {}
  public void stop() {}
  public void destroy() {}
  public void isInited() { return true; }
  public void isStarted() { return true; }

  public String getName() { return "MyService"; }

}
```

We also provide a convenient `timemachine.scheduler.support.AbstractService` class so you may extend it instead. With the abstract class you only need to override the method you interested, and it auto manage the `isInited()` and `isStarted()` states correctly for you.

With your service ready, you may register it to scheduler with following scheduler config properties appended from earlier:

```
# config/scheduler.properties

timemachine.scheduler.userservice.jobLoader.class = timemachine.scheduler.userservice.JobLoaderService

JobLoaderService.01myJob.schedulerdemo.MyJobTask = CronSchedule{expression=* * * * * ?}

timemachine.scheduler.userservice.myService.class = schedulerdemo.MyService
```

Now re-start your scheduler again, and you should see your service initialized with log output to verify.

The above service implementation would not do much because you don't have a reference to the scheduler to setup or do anything. To obtains this, you simply implements timemachine.scheduler.SchedulerListener interface to your existing service class. With that you will have a reference to the scheduler that's fully initialized already. You may pre-setup jobs or manipulate the scheduler any way you want in your `init()` or `start()`method once you save the scheduler reference.

Besides the SchedulerListener, there is also JobListener, `ConfigPropsListener`, or `CoreServiceListener` you may use in the same manner. The JobListener would provide all the events callback methods you would typically want to monitor the scheduler. Since there are many methods to implements, there is a `SchedulerListener` adaptor class that's ready for you to extends as well.

In  this tour, I have introduced and setup a Java Maven based project for you to explore the TimeMachine Scheduler. Go ahead and give these API a try and let us know what you think. If there is any features you are looking for that's not in current scheduler, then please help file an Issue in the project site. We will be glad to evaluate and look forward to improve the project with you.

End of part 4. You may continue [next tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part5.html), or see [previous tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part3.html).

