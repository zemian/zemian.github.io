---
title: TimeMachine Scheduler Tour - Part1
date: 2012-06-06T00:00:00-05:00
tags:
  - timemachine
---
This is part 1 of 7 in a series of articles that will give you a tour of the [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler/wiki/Home) project. These articles will introduce you to the scheduler, how to load jobs and schedules, and explore some of its advanced features. For the most current and accurate instructions, please visit the ReferenceManual from the project site.

## What is TimeMachine Scheduler

TimeMachine is a Java scheduler that can scale and run high volume of jobs with many different types of schedules, such as repeating on fixed interval or based on CRON expressions. The scheduler may control the job executions with thread pools, and it can persist job data into different storage. Users may use the built-in scheduler server with easy configuration file, or developers may use it as a library to extend the scheduler and write custom jobs, schedules, or user services.

## Getting started
First step is to download the latest scheduler distribution and uznip it into your system. Then fire up the scheduler with some sample jobs.

We will be printing commands and its output running on a MacOSX terminal. If you have a Microsoft Windows, then running a Cygwin terminal would also work. Or if you are Linux user then you just use a Terminal.

(NOTE: If you don't feel like downloading software, you may try our [online demo](http://tmschedulerdemo-zdeng.rhcloud.com/scheduler-demo/job-list). You may edit the scheduler configuration directly in a web form, and it will restart the scheduler immediately upon Save.)

If you have downloaded the zip file under an "apps" directory in your HOME folder, then follow these steps to get a scheduler instance running:

```
$ cd $HOME/apps
$ unzip timemachine-scheduler-1.1.1.zip
$ cd timemachine-scheduler-1.1.1
$ bin/scheduler.sh config/scheduler.properties
```

You should see some log output on the terminal console screen like this

```
22:57:08 main INFO| TimeScheduler system services initialized: [
  scheduler: SchedulerData[id=1, name=TimeMachineScheduler],
  schedulerNode: SchedulerNode[nodeId=1, name=ZEMIANs-iMac.local, ip=192.168.1.130],
  configProps: config/scheduler.properties,
  dataStore: MemoryDataStore[name=386981384],
  scheduleRunner: PollingScheduleRunner[name=1186906970],
  classLoader: SimpleClassLoaderService[name=1363910379],
  jobTaskFactory: SimpleJobTaskFactory[name=621450213],
  jobTaskPoolNameResolver: SimpleJobTaskPoolNameResolver[name=1945442111],
  jobTaskThreadPool: DynamicThreadPool[name=jobTaskThreadPool.DEFAULT],
]
22:57:08 main INFO| Scheduler[id=1, nodeId=1, nodeIp=192.168.1.130] initialized. Version=1.1.1.062720122255
22:57:08 main INFO| Scheduler[id=1, nodeId=1, nodeIp=192.168.1.130] started.
```

You may hit CTRL+C to exit the scheduler. The above config/scheduler.properties configuration file would not do much other than load an empty scheduler. To see more in action, try the `config/crontab.properties` config instead. It should look something like this:

```
timemachine.scheduler.userservice.crontabService.class = timemachine.scheduler.userservice.CrontabService
CrontabService.01 = 0 0 * * * ?        | sh -c echo "Hourly task begins."
CrontabService.02 = 0/5 * * * * ?      | sh -c echo "Heart beat."
CrontabService.03 = 0 0/5 * * * ?      | sh -c echo "Five minutes job."
CrontabService.04 = 0 0 12 * JAN,JUN ? | sh -c echo "We should clean up every 6 months."
CrontabService.05 = 0 0 8 ? * 1-5      | sh -c echo "Every workday at 8AM."
```

The above configuration will make the scheduler to work similar to the Unix crontab service. It let you input a [CRON expression](http://tmschedulersite-zdeng.rhcloud.com/scheduler-site/timemachine-scheduler/target/site-deploy/timemachine-scheduler/apidocs/index.html), and then follow by a OS executable command to be run. Go ahead, try to replace the "echo" command in the config file with any other commands that you know of (ping for example), and then restart the scheduler. Our default log settings should display all the external command's output as it execute.

There are few more configuration entries that you may add to customize the scheduler. Here are few we will examine closely. For example:

```
timemachine.scheduler.schedulerName = TimeMachineScheduler
timemachine.scheduler.nodeName = ZEMIANs-iMac.local
timemachine.scheduler.dataStore.class = timemachine.scheduler.service.MemoryDataStore
timemachine.scheduler.jobTaskThreadPool.DEFAULT.class = timemachine.scheduler.service.DynamicThreadPool
timemachine.scheduler.jobTaskThreadPool.DEFAULT.minSize = 0
timemachine.scheduler.jobTaskThreadPool.DEFAULT.maxSize = 4
timemachine.scheduler.jobTaskThreadPool.DEFAULT.threadNamePrefix = ${timemachine.scheduler.schedulerName}-JobTask-Thread-
```

You are free to change the scheduler name. Both the schedulerName and nodeName together will form a unique name for this instance of scheduler. These are printed as you start the scheduler so you can verify and identify them.

We allow you to switch to different datastore, and we are using a in-memory store in this case. We also  provide a HibernateDataStore that you may use to persist the data into a database of your choice. We will cover this later in the tour, but for now we will focus on the simple in-memory store. 

One benefit of using our scheduler over a typical Unix cron is that you may control the thread pool to execute your jobs. You see the last few lines of configuration that defined a dynamic thread pool (it will not create the threads if your scheduler is idle without jobs to run.) You may change the min and max pool size, and you may even change the thread name. You may see the thread name in any JDK management tool such as jvisualvm.

Notice one feature of our scheduler configuration, it allow you to substitude an existing value with `${key}` format! We use this to set our thread name that reuse the value you already set as schedulerName.

End of part 1. You may continue [next tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part2.html).
