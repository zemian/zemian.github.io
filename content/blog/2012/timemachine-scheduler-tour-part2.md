---
title: TimeMachine Scheduler Tour - Part2
date: 2012-06-10T00:00:00-05:00
tags:
  - timemachine
---
This is part 2 of 7 in a series of articles that will give you a tour of the [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler/wiki/Home) project. These articles will introduce you to the scheduler, how to load jobs and schedules, and explore some of its advanced features. For the most current and accurate instructions, please visit the ReferenceManual from the project site.

## Scripting the Scheduler with Groovy

Scripting language is a great way to extend an application, and with Java 6 or higher it has ScriptingEngine API baked right in. There are many solid JVM based scripting engines available out there today. For example Groovy, Ruby or Jython are just few popular open source ones. The TimeMachine Scheduler embraced the easy and flexibility of scripting. I will be covering some of these features in this tour.

Starting JVM 6 or higher, it already comes with JavaScript engine implementation, and there is no external dependency with this. So TimeMachine has default to use "JavaScript" as scripting engine. You may add any other script engine jars in to the "lib" directory and specify the scriptEngineName parameter to change it.

We have found the [Groovy](http://groovy.codehaus.org/) scripting engine to be very productive, and its syntax are very similar to Java language itself, but yet very concise and expressive. So we decided to make TimeMachine distribution zip file pre-packaged the Groovy jars for user convenient. (Note that Groovy is only an optional dependency for TimeMachine scheduler itself, and we have properly set our maven pom.xml as such.)

All the demo code in this tour will use Groovy. You are free to choose other engine if you want to explore it further.

## The ScriptingService

You may initialize the scheduler along with a script file and let it execute and prepare jobs or anything you would need before the scheduler is started. You will start by create a config/scheduler.properties file like this:

```
timemachine.scheduler.userservice.scriptingService.class = timemachine.scheduler.userservice.ScriptingService

ScriptingService.scriptEngineName = Groovy

ScriptingService.initScript = config/myscript.groovy
```

In your config/myscript.groovy file, you may try this:

```
logger.info("Hello World!")

logger.info("I have access to " + scheduler)
```

Now you can fire off the scheduler:

```
$ bin/scheduler.sh config/scheduler.properties
```

You should see the scheduler started with the hello world message printed on log output.

## The Scheduler API

From above  you can see that we give you two variables to play with in the script. The logger is simple one, and you probably don't do anything more than logging info message. The more interesting one is the scheduler variable. This variable would have full access to the scheduler; it  is an instance of  [timemachine.scheduler.Scheduler](http://tmschedulersite-zdeng.rhcloud.com/scheduler-site/timemachine-scheduler/target/site-deploy/timemachine-scheduler/apidocs/timemachine/scheduler/Scheduler.html) class. Let's use this variable to create a cron job in the following Groovy initScript:

```
import timemachine.scheduler.*
import timemachine.scheduler.schedule.*
import timemachine.scheduler.jobtask.*

jobDef = new JobDef()

jobDef.setJobTaskClass(LoggerJobTask.class)

schedule = new CronSchedule()
schedule.setExpression("* * * * * ?")

jobDef.addSchedule(schedule)

scheduler.schedule(jobDef)
```

The scheduler API is pretty self explanatory, but let me be more explicit to help along. We imported all the packages and classes that we need first, then we created a job definition object. We told it what task to do and how often to do it. We created 3 schedules/jobs that will run the task. We finally scheduled and stored this job definition to the scheduler. These jobs will run according to the schedule (every second) as soon as your scheduler starts. You may verify through the output log.

For convenience sake, we also provide factory classes that can make above program even shorter.

```
import timemachine.scheduler.*
jobDef = JobDefs.loggerJobDef()
jobDef.add(Schedules.cron("* * * * * ?"))
scheduler.schedule(jobDef)

## Schedule Types

Besides the CronSchedule, we also have RepeatSchedule and DateListSchedule schedule types. We have created a nice factory methods in Schedules that return one of these schedule. For example, we may create a minutely repeat schedule and an explicit date list schedules in the initScript like this: 

import timemachine.scheduler.*
jobDef = JobDefs.osCommandJobDef("cmd.exe /c echo 'Hello World.'")
jobDef.addSchedule(Schedules.minutely(5))
jobDef.addSchedule(Schedules.datelist(*[Schedules.datetime("01/01/2013 08:00:00"), Schedules.datetime("01/01/2014 08:00:00")]))

scheduler.schedule(jobDef)
```

In above, we have scheduled one job definition with two schedules to run. First one runs every 5 mins, and the second one runs twice on an explicit given dates.

Note: The asterisk in front of left bracket is needed due to Groovy syntax on passing an list object into Java's wildcard variable argument.

## JobTask Types

Besides the LoggerJobTask and OsCommandJobTask built-in JobTask you have seen above, we also have a powerful ScriptingJobTask that let you build a job task in Groovy code! This means you may add a new job without even compiling Java code! Here is an example of Groovy initScript script that will create a new "scripting" job.

```
import timemachine.scheduler.*
jobDef = JobDefs.groovyJobDef('''
file= new File("/tmp/counter.data")
if (!file.exists())
  num = 1
else
  num  = file.text.toInteger() + 1
logger.info("Incrementing counter $num in $file")
file.write(num)
''')
jobDef.addSchedule(Schedules.secondly(1)) // run every second.

scheduler.schedule(jobDef)
```

In above example, we created a job that runs every second. The job task will increment a counter in a file and re-save it every time the job runs.

## Pretty Groovy ...

There you go. Above is your first custom job in TimeMachine Scheduler! The Groovy language is very similar to Java in syntax, yet minus all the noises, so it's very productive. Groovy also access and integrate with existing [Java API](http://docs.oracle.com/javase/6/docs/api/) seamlessly, so you may access and control the scheduler with easy. 

Interested? Go and [download](https://bitbucket.org/timemachine/scheduler/downloads)the scheduler today and give it a try!

End of part 2. You may continue [next tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part3.html), or see [previous tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part1.html).
