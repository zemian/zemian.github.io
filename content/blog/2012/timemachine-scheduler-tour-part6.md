Title: TimeMachine Scheduler Tour - Part6
Date: 2012-06-22 00:00:00-05:00
Tags: timemachine



This is part 6 of 7 in a series of articles that will give you a tour of the [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler/wiki/Home) project. These articles will introduce you to the scheduler, how to load jobs and schedules, and explore some of its advanced features. For the most current and accurate instructions, please visit the ReferenceManual from the project site.

## Configuring Multiple ThreadPools

By now you know how to write your own JobTask and even write your own Schedule implementation in TimeMachine Scheduler. We will switch back to configuration for a bit to talk about how to control the job execution.

By default the scheduler will have two thread pools. The first one is reserved for system services, and default to only 1 fixed thread pool (used by PoolingScheduleRunner). The second thread pool is default to 4 dynamic threads exclusively for running JobTask only. Here is how the default config looks like for these pools:

```
# System service thread pool (you only need one pool!)
timemachine.scheduler.systemThreadPool.class = timemachine.scheduler.service.FixedSizeThreadPool
timemachine.scheduler.systemThreadPool.maxSize = 1
timemachine.scheduler.systemThreadPool.threadNamePrefix = ${timemachine.scheduler.schedulerName}-System-Thread-

# Default jobTask thread pool (you may define more than one pool!)
timemachine.scheduler.jobTaskThreadPool.DEFAULT.class = timemachine.scheduler.service.DynamicThreadPool
timemachine.scheduler.jobTaskThreadPool.DEFAULT.minSize = 0
timemachine.scheduler.jobTaskThreadPool.DEFAULT.maxSize = 4
timemachine.scheduler.jobTaskThreadPool.DEFAULT.timeToLive = 300000
timemachine.scheduler.jobTaskThreadPool.DEFAULT.useShutdownNow = false
timemachine.scheduler.jobTaskThreadPool.DEFAULT.maxShutdownWaitTime = 1000
timemachine.scheduler.jobTaskThreadPool.DEFAULT.threadNamePrefix = ${timemachine.scheduler.schedulerName}-JobTask-Thread-
```

As you use the scheduler for more jobs, you might run into situation where you want to create multiple thread pools to run certain specific JobTask's. In this case, you want to configure certain jobs that would only run in a isolated threads pool. The TimeMachine Scheduler has this feature that you create multiple thread pools, and it allow you to match to job task's name. When you do this, you would also need to create a JobTaskPoolNameResolver that would resolve JobTask's name match to one of the thread pool you configured. Here is an example of scheduler configuration file that exercise this:

```
# Extra job tasks thread pool
timemachine.scheduler.jobTaskThreadPool.MYPOOL2.class = timemachine.scheduler.service.DynamicThreadPool
timemachine.scheduler.jobTaskThreadPool.MYPOOL2.maxSize = 4
timemachine.scheduler.jobTaskThreadPool.MYPOOL2.threadNamePrefix = MYPOOL2-Thread-

# Extra job tasks thread pool
timemachine.scheduler.jobTaskThreadPool.MYPOOL3.class = timemachine.scheduler.service.DynamicThreadPool
timemachine.scheduler.jobTaskThreadPool.MYPOOL3.maxSize = 4
timemachine.scheduler.jobTaskThreadPool.MYPOOL3.threadNamePrefix = MYPOOL3-Thread-

# Resolving multiple jobTask thread pools
timemachine.scheduler.jobTaskPoolNameResolver.poolName.MYPOOL2.matchToJobNameRexp = MyJobType2.*
timemachine.scheduler.jobTaskPoolNameResolver.poolName.MYPOOL3.matchToJobNameRexp = MyJobType3.*
```

The name to pool matching is done using the Java regular expression. The example above setup two set of job task names match to each of their pool instance. Any job names starting with MyJobType2 will be executed by MYPOOL2, while any starting with MyJobType3 will be executed by MYPOOL3. And finally if any JobTask name that doesn't match will use the DEFAULT pool.

Note that JobTask's name is only optional (only ID is required and it's auto generated), so to use this features, you want to ensure to set the JobTask's name that match your configured pool, or else they all default back to single DEFAULT pool.

End of part 6. You may continue [next tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part7.html), or see [previous tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part5.html).

