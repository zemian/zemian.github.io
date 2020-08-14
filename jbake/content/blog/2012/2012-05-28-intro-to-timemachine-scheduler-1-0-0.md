---
title: Intro to TimeMachine Scheduler 1.0.0
date: 2012-05-28
tags:
  - timemachine
---
Hello developers,

I am happy to annouce the first release of TimeMachine Scheduler is available for you to download here:

[https://bitbucket.org/timemachine/scheduler/downloads](https://bitbucket.org/timemachine/scheduler/downloads)

Our first release of the scheduler comes with many features ready to use already. I will briefly describe 
them here.

Out of the box, you can use it as an Unix Crontab system replacement. Since it's Java based, you can run it in Windows as well.You may pass a config file that loos like this and kick of the scheduler server to execute any OS commands or scripts you wish:
    timemachine.scheduler.userservice.crontab.class = timemachine.scheduler.userservice.CrontabService
    CrontabService.01 = 0 0 * * * ?        | sh -c echo "Hourly task begins."
    CrontabService.02 = 0/5 * * * * ?      | sh -c echo "Heart beat."

The scheduler has flexible configuration and allow full control on the job executions settings. For example you may configure the job task thread pool to be dynamic, so that it only creates threads when there are jobs to be run, else the pool size will shrink. Or you can even create multiple thread pools and match your jobs, effectively separated them in running Queues.

Besides using external native commands, the scheduler also let you write your own job tasks. You can write new job task in either Java, JavaScript or Groovy scripting language. We package the optional Groovy engine in our distribution so it can be more convenient to write your own job, without even the need to re-compile source files, nor restart the scheduler instance!

The scheduler comes with 3 built-in Schedule implementations that you may use to configure how often a job task runs. There is a RepeatSchedule that runs job in a fixed interval manner; a CronSchedule that uses a Unix CRON expression; and we have the DateListSchedule that simply let you use any arbituray dates to run.

For this initial release, we only provide a in-memory data store implementation for persisting job and scheduling data. Our goal is to support other type of data store persistance such as using a database in the future. But even with this release, we've designed our API to support multiple scheduler nodes that run under a single logic scheduler. You can even do this with our in-memory data store!

The TimeMachien Scheduler is designed to run with high volumes of jobs, and to give you flexible 
control on time scheduling, threads executions and data storage. You can learn more on our project site [https://bitbucket.org/timemachine/scheduler/wiki](https://bitbucket.org/timemachine/scheduler/wiki)

Enjoy,

Zemian Deng