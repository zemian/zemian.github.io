title=High Level Design Diagrams for TimeMachine Scheduler
date=2012-09-29
type=post
tags=timemachine
status=published
~~~~~~

Despite the advance of all the computers, I am one of those guys who still carry a pen and composition notebook around. I am far from those who has photographic memories, nor one who can digest every thing in their heads. Especially when it comes to doing software design. I still find my self scribbling on my notebook quite a bit, or even on piece of napkin if no paper is available. I am also one of those who only need high level ideas drawn out, then I can usually go directly to code, map it to some API and then write some simple implementations to get started. 

That's how I started with the [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler) project a while back. However, as we come to a point where we have a solid runnable code, we must also start to present it to others. Showing my composition notebook is not the prettier thing in the world, specially when I have no gift in penmenship at all. This is a time to look into some professional diagram and design tools to draw up the high level architecture.

I was contacted by [Architexa](http://www.architexa.com) to give them some review of their tool. I think this is a great opportunity for me to try it to draw up some diagrams on the TimeMachine project. Most of what I have diagrammed here are explained in details in the project [reference manual](https://bitbucket.org/timemachine/scheduler/wiki/ReferenceManual), so if you want to know more, please do read it up for further reference.

# TimeMachine top level packages

First, the Architexa provides their software as an Eclipse plugin, and after installing it, it can analysis an existing project. I did that and here is the package level view it presents me for the TimeMachine.

![TimeMachine packages dependencies diagram](https://bitbucket.org/saltnlight5/images/raw/84cde5b1e9ba/timemachine-diagrams/package-dependencies.png)

The graph is not very clear on why everything depends on `schedule` package, but perhaps Schedule is used through the code. Any way the TimeMachine has been carefully separating out the pakcages so it's easy for user to use. All the interfaces you need to scheduler jobs are in `timemachine.scheduler`. In it, there are couple static factories class: `Schedules` and `JobTasks` provide majority of the functionity you need. So the goal is you can do quiet a bit with just `import timemachine.scheduler.*;`; then as you need each layer functionality, you can import them explicitly the sub-packages.

# TimeMachine main classes diagrams

In TimeMachine, you have few major class hierarchy that you must need to get familiar in order to write effective scheduling jobs. 

A job in TimeMachine is implemented by a class with `JobTask` interface. The project provide few for you to get started.

![TimeMachine JobTask class diagram](https://bitbucket.org/saltnlight5/images/raw/84cde5b1e9ba/timemachine-diagrams/jobtask-class-hierarchy.png)

How often and frequent to run your job in the scheduler is provided by a `Schedule`. Here we provided some most used implementations, including the customizable `DateListSchedule` that uses a `provider` generator.

![TimeMachine Schedule class diagram](https://bitbucket.org/saltnlight5/images/raw/84cde5b1e9ba/timemachine-diagrams/schedule-class-hierarchy.png)

The TimeMachine is a scheduler composed by a stackable service container. Here are some of the services that power the scheduler as a whole. The user/developer can write their own user `Service` and add into the container as well.

![TimeMachine SchedulerEngine class diagram](https://bitbucket.org/saltnlight5/images/raw/84cde5b1e9ba/timemachine-diagrams/service-class-hierarchy.png)

The services above are then combined together to form the scheduler engine.

![TimeMachine SchedulerEngine class diagram](https://bitbucket.org/saltnlight5/images/raw/84cde5b1e9ba/timemachine-diagrams/scheduler-engine-class-hierarchy.png)

# TimeMachine in action diagrams

Depicting sequence diagram is pretty challenging. The Architexa plugin is pretty good in this area, especially when you already have code already done. The Architexa plugin would take advantage of existing code and Java reflection and give you a selectable choice on what and to where as action. Here I will highlight couple actions in TimeMachine.

The most basic startup of the TimeMachine sequence would look something like this.

![TimeMachine Scheduler startup up sequence diagram](https://bitbucket.org/saltnlight5/images/raw/84cde5b1e9ba/timemachine-diagrams/scheduler-start-up-sequence.png)

In the heart of the scheduler logic is in the `PollingScheduleRunner` service, and here are some of the actions depicted.

![TimeMachine PollingScheduleRunner sequence diagram](https://bitbucket.org/saltnlight5/images/raw/84cde5b1e9ba/timemachine-diagrams/polling-schedule-runner-sequence.png)

# Using Architexa

Over all, I think Architexa provided a pretty good plugin for Eclipse. I have some problems when generating the sequence diagrams. For example, I can't resize the width between two actors(classes) to display full method name. And in some actions there are no lines drawn! I suspect it's due to the tool is using code inspection, and some of the call are called by different threads.

The plugin itself seems pretty solid. You can install and uninstall without harm. They currently offer free download for small number of users, which I think it's a great way for you to explorer.

I am not too sure how effective of Architexa on builing a collabration of sharing these diagrams as platform. I treat these diagrams as supplement to the project. It certainly helps in explaining high level architeture, but it's far from the complete documentation. No documentation can get any closer to the code. I think the strength of Java being static already provided some level of documentation when just reading the code alone. I would rather Architexa to focus and perfecting the plugin that draw the diagram, because these are more important to me.