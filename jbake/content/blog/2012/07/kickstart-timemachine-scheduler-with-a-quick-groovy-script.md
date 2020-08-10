title=Kickstart TimeMachine Scheduler with a quick Groovy script
date=2012-07-09
type=post
tags=groovy, timemachine
status=published
~~~~~~
If you have [Groovy ](http://groovy.codehaus.org/)installed, you can kick start a [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler) job without any setup! Try this out:

// Create a repeating schedule job that runs every 3 seconds.
@Grab('org.slf4j:slf4j-simple:1.6.6')
@Grab('org.bitbucket.timemachine:timemachine-scheduler:1.2.2')
import timemachine.scheduler.*
scheduler = new SchedulerFactory().createScheduler()
scheduler.init()
jobDef = JobDefs.groovyJobDef('''
    println("Hello World.")
''')
jobDef.addSchedule(Schedules.secondly(3))
scheduler.schedule(jobDef)
scheduler.start()
addShutdownHook{ scheduler.destroy() }