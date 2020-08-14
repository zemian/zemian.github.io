---
title: Quartz 2.1.0 has been released!
date: 2011-09-24
tags:
  - quartz
---
[Quartz 2.1.0](http://quartz-scheduler.org/downloads/catalog) has been released!

In this release, I have helped fixed some bugs, and added a new built-in trigger type: DailyTimeIntervalTrigger. This new trigger will allow you to specify a interval time in either seconds, minutes, or hours interval on each day (Like fire every 72 mins starting at 7am everyday). And the daily start time will be reset each day regardless what time it ended in that day! You may even limit daily ending time too. And you may limit the days to run on certain weekdays only as well. You may see many examples on how this trigger is used here: [http://svn.terracotta.org/fisheye/browse/Quartz/trunk/quartz/src/test/java/org/quartz/DailyTimeIntervalScheduleBuilderTest.java?r=HEAD](http://svn.terracotta.org/fisheye/browse/Quartz/trunk/quartz/src/test/java/org/quartz/DailyTimeIntervalScheduleBuilderTest.java?r=HEAD)

Another feature worthy of note in this release is the "batch" mode is finally working! You may turn this on by using "org.quartz.scheduler.batchTriggerAcquisitionMaxCount" and "org.quartz.scheduler.batchTriggerAcquisitionFireAheadTimeWindow" in your quartz.properties file. See config doc here: [http://quartz-scheduler.org/documentation/quartz-2.1.x/configuration/ConfigMain](http://quartz-scheduler.org/documentation/quartz-2.1.x/configuration/ConfigMain)