---
title: MySchedule-3.2.1.0 is out!
date: 2013-08-23T00:00:00-05:00
tags:
  - myschedule
---

The main work on this release is upgrade to Quartz 2.2.1

    
- Upgraded to Quartz 2.2.1
- Upgraded to SLF4J 1.7.5

- Quartz 2.2.1 API has some changes that break backward compatibility and this release addressed these
  issues:

  - SchedulerPlugin interface now has different #initialize() signature
  - SchedulerListener interface has added new method #schedulerStarting()
  - Scheduler interface has couple new methods addJobs and schedulerJobs with Set instead of List.
    

Get it here: [https://code.google.com/p/myschedule/downloads/list](https://code.google.com/p/myschedule/downloads/list)
