title=Exploring different scheduling types with Quartz 2
date=2012-10-22
type=post
tags=quartz
status=published
~~~~~~

We often think of Cron when we want to schedule a job. Cron is very flexible in expressing an repeating occurance of an event/job in a very compact expression. However it's not answer for everything, as I often see people are asking for help in the Quartz user forum. Did you know that the popular [Quartz 2](http://quartz-scheduler.org) library provide many other schedule types (called Trigger) besides cron? I will show you each of the Quartz 2 built-in schedule types here within a complete, standalone Groovy script that you can run and test it out. Let's start with a simple one.

    @Grab('org.quartz-scheduler:quartz:2.1.6')
    @Grab('org.slf4j:slf4j-simple:1.7.1')
    import org.quartz.*
    import org.quartz.impl.*
    import org.quartz.jobs.*
    
    import static org.quartz.DateBuilder.*
    import static org.quartz.JobBuilder.*
    import static org.quartz.TriggerBuilder.*
    import static org.quartz.SimpleScheduleBuilder.*
    
    def trigger = newTrigger()
        .withSchedule(
            simpleSchedule()
            .withIntervalInSeconds(3)
            .repeatForever())
        .startNow()
        .build()
    dates = TriggerUtils.computeFireTimes(trigger, null, 20)
    dates.each{ println it }
    

This is the Quartz's `SimpleTrigger`, and it allows you to create a fixed rate repeating job. You can even limit to certain number of count if you like. I have imported all the nessary classes the script needs, and I use the latest Quartz 2.x builder API to create an instance of the trigger.

The quickest way to explore and test out whether a scheduling fits your need is to print out its future execution times. Hence you see me using `TriggerUtils.computeFireTimes` in the script. Run the above and you should get the datetimes as scheduled to be run, in this case every 3 seconds.

    bash> $ groovy simpleTrigger.groovy
        Tue Oct 23 20:28:01 EDT 2012
        Tue Oct 23 20:28:04 EDT 2012
        Tue Oct 23 20:28:07 EDT 2012
        Tue Oct 23 20:28:10 EDT 2012
        Tue Oct 23 20:28:13 EDT 2012
        Tue Oct 23 20:28:16 EDT 2012
        Tue Oct 23 20:28:19 EDT 2012
        Tue Oct 23 20:28:22 EDT 2012
        Tue Oct 23 20:28:25 EDT 2012
        Tue Oct 23 20:28:28 EDT 2012
        Tue Oct 23 20:28:31 EDT 2012
        Tue Oct 23 20:28:34 EDT 2012
        Tue Oct 23 20:28:37 EDT 2012
        Tue Oct 23 20:28:40 EDT 2012
        Tue Oct 23 20:28:43 EDT 2012
        Tue Oct 23 20:28:46 EDT 2012
        Tue Oct 23 20:28:49 EDT 2012
        Tue Oct 23 20:28:52 EDT 2012
        Tue Oct 23 20:28:55 EDT 2012
        Tue Oct 23 20:28:58 EDT 2012
    

The most frequent used scheduling type is the `CronTrigger`, and you can test it out in similar way.

    @Grab('org.quartz-scheduler:quartz:2.1.6')
    @Grab('org.slf4j:slf4j-simple:1.7.1')
    import org.quartz.*
    import org.quartz.impl.*
    import org.quartz.jobs.*
    
    import static org.quartz.DateBuilder.*
    import static org.quartz.JobBuilder.*
    import static org.quartz.TriggerBuilder.*
    import static org.quartz.CronScheduleBuilder.*
    
    def trigger = newTrigger()
        .withSchedule(cronSchedule("0 30 08 * * ?"))
        .startNow()
        .build()
    dates = TriggerUtils.computeFireTimes(trigger, null, 20)
    dates.each{ println it }
    

The javadoc for [CronExpression](http://quartz-scheduler.org/api/2.1.5/org/quartz/CronExpression.html) is very good and you should definately read it throughly to use it effectively. With the script, you can explore all the combination you want easily and verify future fire times before your job is invoked.

Now, if you have some odd scheduling needs such as run a job every 30 mins from MON to FRI and only between 8:00AM to 10:00AM, then don't try to cramp all that into the Cron expression. The Quartz 2.x has a dedicated trigger type just for this use, and it's 
called `DailyTimeIntervalTrigger`! Check this out:

    @Grab('org.quartz-scheduler:quartz:2.1.6')
    @Grab('org.slf4j:slf4j-simple:1.7.1')
    import org.quartz.*
    import org.quartz.impl.*
    import org.quartz.jobs.*
    
    import static org.quartz.DateBuilder.*
    import static org.quartz.JobBuilder.*
    import static org.quartz.TriggerBuilder.*
    import static org.quartz.DailyTimeIntervalScheduleBuilder.*
    import static java.util.Calendar.*
    
    def trigger = newTrigger()
        .withSchedule(
            dailyTimeIntervalSchedule()
            .startingDailyAt(TimeOfDay.hourMinuteAndSecondOfDay(8, 0, 0))
            .endingDailyAt(TimeOfDay.hourMinuteAndSecondOfDay(10, 0, 0))
            .onDaysOfTheWeek(MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY)
            .withInterval(10, IntervalUnit.MINUTE))
        .startNow()
        .build()
    dates = TriggerUtils.computeFireTimes(trigger, null, 20)
    dates.each{ println it }
    

Another hidden Trigger type from Quartz is `CalendarIntervalTrigger`, and you would use this if you need to repeat job that's in every interval of a calendar period, such as every year or month etc, where the interval is not fixed, but calendar specific. Here is a test script for that.

    @Grab('org.quartz-scheduler:quartz:2.1.6')
    @Grab('org.slf4j:slf4j-simple:1.7.1')
    import org.quartz.*
    import org.quartz.impl.*
    import org.quartz.jobs.*
    
    import static org.quartz.DateBuilder.*
    import static org.quartz.JobBuilder.*
    import static org.quartz.TriggerBuilder.*
    import static org.quartz.CalendarIntervalScheduleBuilder.*
    import static java.util.Calendar.*
    
    def trigger = newTrigger()
        .withSchedule(
            calendarIntervalSchedule()
            .withInterval(2, IntervalUnit.MONTH))
        .startAt(futureDate(10, IntervalUnit.MINUTE))
        .build()
    dates = TriggerUtils.computeFireTimes(trigger, null, 20)
    dates.each{ println it }
    

I hope these will help you get started on most of your scheduling need with Quartz 2. Try these out and see your future fire times before even scheduling a job into the scheduler should save you some times and troubles.