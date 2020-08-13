title=TimeMachine Scheduler 1.2.0 release is out!
date=2012-07-15
type=post
tags=timemachine
status=published
~~~~~~

I just released the [timemachine-scheudler-1.2.0](https://bitbucket.org/timemachine/scheduler/downloads), and it now comes with both stand-alone server (zip) and web application (war) distribution packages.

In this [release](https://bitbucket.org/timemachine/scheduler/wiki/ReleaseNotes), I fixed few major bugs and made many small clean ups and minor fixes. I also added few new features. I will briefly introduce them to you here.

## 
Groovy 2.0

I have upgraded the optional script engine dependency to latest groovy 2.0.0 within our scheduler distribution. The groovy-2.0.0 has modularized their jar distribution, and our scheduler only requires minimal of jsr-223 module, so our overall package size should be smaller.

## 
TimeMachine-Web

I have added a web application that can provide a fully running scheduler. This web app provides UI screens that let you manage and view jobs/schedules, and it can even edit the scheduler configuration online.

You can see more info on [WebConsole](https://bitbucket.org/timemachine/scheduler/wiki/WebConsole) doc, or try it out with our [demo](http://demos-tmscheduler.rhcloud.com/timemachine-web).

## 
Schedule Priority

You may now set a priority value 1-9 on any Schedule, and the default is 5. These are used if you have schedules that has same nextRun time, and having the lower priority value will get to run first.

## 
Event and Job Histories

In this release, I also provided a EventHistoryService that can record all major scheduler events such as when scheduler init, start, stop or destroyed. Also when scheduling data are added or deleted. And all the job run events are also recorded. To support this, we added a new built-in data model: EventHistory. You may retrieve and store these with our DataStore service if you desire. As convenience, we have added a History screen on our web application that display all the events happening in the scheduler.

This feature is disabled by default, but to enable it is easy. You simply add the following value in the scheduler configuration file:
timemachine.scheduler.eventHistory.class = timemachine.scheduler.service.EventHistoryService

There are few more options you may configure with this service, and you can read more it on the scheduler [reference doc](https://bitbucket.org/timemachine/scheduler/wiki/ReferenceManual).