---
title: TimeMachine Scheduler Tour - Part7
date: 2012-06-24T00:00:00-05:00
tags:
  - timemachine
---

This is part 7 of 7 in a series of articles that will give you a tour of the [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler/wiki/Home) project. These articles will introduce you to the scheduler, how to load jobs and schedules, and explore some of its advanced features. For the most current and accurate instructions, please visit the ReferenceManual from the project site.

## Running Multiple Schedulers in a Clustering Mode

One of TimeMachine Scheduler goal is to be scalable and run high number of jobs. One of the way to do this is be able to run multiple schedulers on separate JVM under a single logical scheduler data space. In previous articles, you might already have noticed that our data models were designed to support multiple scheduler data space from the begining. This feature is actually already implicitly enabled by default, and you do not have to do much to take advantage of it!

When running multiple schedulers (usually on separated JVM, but not required), your scheduler configuration is still all the same, except you need to pay attention to these two properties:

	timemachine.scheduler.schedulerName = TimeMachineScheduler

	timemachine.scheduler.nodeName = #{hostname}

In order to keep all data in a single logical scheduler, your schedulerName must be unique among all other nodes configuration files that belong in same cluster. Within the cluster, each nodeName must be unique. In fact, as default, the schedulerNode is default to your hostname already. So if you are running each scheduler on separate machines, you automatically will join into the default logical scheduler named "TimeMachineScheduler" with your hostname as node name.

## Using HibernateDataStore

A typical and common way to run scalable data store is to use a database persistence. Our HibernateDataStore would let you run all clustered scheduler configuration and store the data in a database of your choice (well as many as Hibernate would support). Each scheduler node would record itself during start and stop with host IP and timestamp and etc. And each JobDef and Schedule are store per each logical SchedulerData, so the namespace is already in place. Each scheduler node would execute whatever schedule that's next run is due in a first "poll" first "run" fashion. If no schedules to be run, then the node would just be idling.

## Using MemoryDataStore

Our MemoryDataStore implementation actually supports multiple scheduler as well! But it's not enabled as default. The default config is to use a new instance of the MemoryDataStore for data space, and thus the data will be lost and reset per scheduler start/stop. But if you add this config property:

	timemachine.scheduler.dataStore.memoryDataStore.useSingleton = true

This would make the MemoryDataStore service to use a singleton instance of the MemoryDataStore  for multiple schedulers to store data, thus making it cluster enable as well. This would be handy if you want to explore Big Memory or Data environment.

## Summary

This would conclude our tour with the TimeMachine Scheduler. We hope these articles have given you helpful information to explore more. Our goals are to provide a scheduler that can scale well, able to run high concurrent jobs, allow flexible schedules, and easy to configure. We love to hear your feedback. Please visit the project site and join the user forum to participate.

End of part 7. You may see [previous tour](http://saltnlight5.blogspot.com/2012/06/timemachine-scheduler-tour-part6.html).
