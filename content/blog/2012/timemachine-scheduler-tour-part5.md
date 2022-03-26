---
title: TimeMachine Scheduler Tour - Part5
date: 2012-06-20T00:00:00-05:00
tags:
  - timemachine
---

This is part 5 of 7 in a series of articles that will give you a tour of the [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler/wiki/Home) project. These articles will introduce you to the scheduler, how to load jobs and schedules, and explore some of its advanced features. For the most current and accurate instructions, please visit the ReferenceManual from the project site.

## How to create Custom Schedule

We have shown you how to create custom JobTask in previous tour. In most cases, you would write a custom JobTask and then pick one of built-in Schedule to run it. The TimeMachine Scheduler currently provides 3 built-in Schedule's: CronSchedule, RepeatSchedule and DateListSchedule. So what happen if these are not want you wanted, and you need special scheduling pattern? You can certainly write and extend the timemachine.scheduler.Schedule class and provide all the needed methods. But writing such Schedule implementation is much harder. Not only you would need to fully understand the base class, you would also need to deal with the persistence side in the DataStore; saving and re-load the states of your new Schedule implementation. In case of HibernateDataStore, you would also need to add a new entity mapping file etc. This is a lot of work to create a customized Schedule to run in a scheduler. Fortunately we provide something better and easier.

Our solution is in the DateListSchedule. By default this schedule only let you set a list of dates explicitly to run. The scheduler would simply run on those specified dates and times, and when the schedule has reached at the end of the list, it's done. The Schedule will be mark it as completed and remove it after the last job task has been run. 

However, there is another usage of DateListSchedule, that is to use a DateListProvider to supply a new dates list whenever the Schedule has reached the end of the list. You simply need to set a DateListProvider implementation class name in the schedule instance.

## Writing and using DateListProvider

Let's say you want a job to be run on every midnight end of month. We will show you how this can be done with our DateListSchdule.

First, write a class that implements timemachine.scheduler.DateListProvider interface that will return last day of the month each time it's called, like this:

```
package schedulerdemo;
import java.util*;
import timemachine.scheduler.*;
import timemachine.scheduler.schedule.*;
public class MyEndOfMonthDateListProvider implements DateListSchedule.DateListProvider {
  public List<Date> getDateList(DateListSchedule schedule) {
    List<Date> result = new ArrayList<Date>();
    Date prevDate = schedule.getPrevRun();
    if (prevDate == null)
      result.add(Schedules.endOfMonth(Schedules.time("00:00:00")));
    else
      result.add(Schedules.endOfMonth(Schedules.addMonths(prevDate, 1)));
    return result;
  }
}
```

Noticed that we take care to use prevRun date as starting point to calculate the next last-day-of-Month. And if prevRun is null, then we know that it's the first time it's called, so we need to create an initial date first. Again, our Schedules utility class can be a great help when handling with Java dates calculation.

Now you can use above class in a DateListSchedule to schedule any job def. For example, you may schedule a job in a user service during init of the scheduler like this:

```
package schedulerdemo;
import timemachine.scheduler.*;
import timemachine.scheduler.schedule.*;
import timemachine.scheduler.support.*;
public class MyService extends AbstractService implements SchedulerListener {
  private Scheduler scheduler;
  public void onScheduler(Scheduler scheduler) { this.scheduler = scheduler; }
  public void init() {
    DateListSchedule schedule = new DateListSchedule();
    schedule.setDateListProviderClassName(MyEndOfMonthDateListProvider.class);
    JobDef jobDef = JobDefs.groovyJobDef("logger.info('Hello')");
    jobDef.addSchedule(schedule);
    scheduler.schedule(jobDef);
  }
}
```

Next, run the scheduler with the following config file:

  timemachine.scheduler.userservice.myService.class = schedulerdemo.MyService

## Using ScriptingDateListProvider

With the same concept as above, we also provided a built-in ScriptingDateListProvider class that let you create custom date list with Scripting. This allow you to write custom schedule without even recompiling a Java project!

In order to support  ScriptingDateListProvider, the DateListSchedule has another field that can be set using setDateListProviderData() method. This field is a string of data map in the key=value,key2=value2 format. We need this information to tell what scriptEngineName to use, and the scriptText to be executed (or scriptFile).

To mimic above example again , we are going to switch to Groovy scripting completly, even writing the user service in Groovy initScript, so no Java compile is needed. 

First create a scheduler config file like this:

```
timemachine.scheduler.userservice.myScriptService.class = timemachine.scheduler.userservice.ScriptingService
ScriptingService.scriptEngineName = Groovy
ScriptingService.initScript = config/init.groovy
```

Now create the config/init.groovy initScript file:

```
import timemachine.scheduler.*
import timemachine.scheduler.schedule.*
import timemachine.scheduler.support.*
schedule = new DateListSchedule()
schedule.setDateListProviderClassName(ScriptingDateListProvider.class)
schedule.setDataListProviderData('''
  scriptEngineName=Groovy,scriptText=
    import timemachine.scheduler.*
    prevDate = dateListSchedule.getPrevRun()
    if (prevDate == null)
      [Schedules.endOfMonth(Schedules.time("00:00:00"))]
    else
      [Schedules.endOfMonth(Schedules.addMonths(prevDate, 1))]
''')
jobDef = JobDefs.groovyJobDef("logger.info('Hello')")
jobDef.addSchedule(schedule)
scheduler.schedule(jobDef)
```

There, you just experienced a little bit of script within script! Pretty cool huh? Go ahead and re-start your scheduler with above config and you shall see your custom schedule in action.

As you can see, our DateListSchedule can give you a very flexible way to customize any schedule needs, even with dynamic scripting. Since this DateListSchedule is already part of the built-in schedule, all the persistence layer would work correctly without modifying any classes nor database structure.

End of part 5. You may continue [next tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part6.html), or see [previous tour](https://zemian.github.io/2012/06/timemachine-scheduler-tour-part4.html).
