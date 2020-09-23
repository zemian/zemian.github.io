(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{417:function(e,t,a){"use strict";a.r(t);var o=a(10),s=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("This is part 3 of 7 in a series of articles that will give you a tour of the "),a("a",{attrs:{href:"https://bitbucket.org/timemachine/scheduler/wiki/Home",target:"_blank",rel:"noopener noreferrer"}},[e._v("TimeMachine Scheduler"),a("OutboundLink")],1),e._v(" project. These articles will introduce you to the scheduler, how to load jobs and schedules, and explore some of its advanced features. For the most current and accurate instructions, please visit the ReferenceManual from the project site.")]),e._v(" "),a("h2",{attrs:{id:"scheduler-data-models"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scheduler-data-models"}},[e._v("#")]),e._v(" Scheduler Data Models")]),e._v(" "),a("p",[e._v("The main API entry to TimeMachine Scheduler is the timemachine.scheduler.Scheduler interface. Our default Scheduler implementation is simply a container that hosts many Service's, and one of the system service is reponsible for storing data. Before I cover more on these system service functionalities, I should introduce to you on the data models that the store service will use.")]),e._v(" "),a("p",[e._v("There four major data models that we persist and managed in the scheduler. They are listed here.")]),e._v(" "),a("ul",[a("li",[e._v("SchedulerData - Represents a logical scheduler. It has an id and a name. A logical scheduler may have one or more physical ScheduleNode.")]),e._v(" "),a("li",[e._v("SchedulerNode - Represents a physical scheduler instance that runs on a JVM server node. It has an id, name, hostname, IP address, start time, and stop time etc.")]),e._v(" "),a("li",[e._v("JobDef - A job definition has all the information about a job to be run in a scheduler that belong to a SchedulerData. A JobDef will have an id, an optional name, job task class name, and zero or more Schedule associated with it. A job definition may also contains a map of String properties store data that's specific for that job task.")]),e._v(" "),a("li",[e._v("Schedule- A schedule has all the information to tell when and how often a JobDef's job task will be run. It must exists under a JobDef instance. Besides some common properties, there are 3 specific sub-classes of Schedule that we store separately: CronSchedule, RepeatSchedule, and DateListSchedule. They all share some comon fields such as id, name, startTime, nextRun datetime, missedRunPolicy etc. But they each also have their own additional fields for their specific function as well.")])]),e._v(" "),a("p",[e._v("Note that the scheduler DataStore system service will auto generate ID value for each instance of model to be store. You can always uniquely identified an model object by it's ID value. Both JobDef and Schedule's name is optional and only used to help user perform search by a string name.")]),e._v(" "),a("h2",{attrs:{id:"how-the-scheduler-works"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-the-scheduler-works"}},[e._v("#")]),e._v(" How the Scheduler Works")]),e._v(" "),a("p",[e._v("When the scheduler starts, it will first create and initialize a SchedulerNode. Each SchedulerNode must belong to a SchedulerData. If this logical SchedulerData doesn't exists yet, then it will be auto created, else it will use the existing one. Recall that in our scheduler config file, you have the option to set schedulerName and nodeName, and these two values will uniquecally identify the node instance.")]),e._v(" "),a("p",[e._v("Next the scheduler will initialize and execute the ScheduleRunner system service that will check the DataStore for any job definitions (JobDef) to be run. If they exists, then it checks to see if they have Schedule associated. For each Schedule that belong to a JobDef, it will then check for nextRun datetime. When it's time to run, the runner service will instanciate the JobDef's jobTaskClassName object dynamically at runtime, and invoke it's run() method. That's when the actual job's task, or work, begins.")]),e._v(" "),a("p",[e._v("Note that JobDef do not store the task instance directly, but only the class name instead. This is so we can scale and store many job defintions instead of the in-memory objects. The creation of the job task object is at runtime, and you may completely control it by override the JobTaskFactory service.")]),e._v(" "),a("p",[e._v("Before a JobDef's Schedule is to be run, the scheduler also track and update it's states. It will go from WAITING to STAGING to RUNNING, and then back to WAITING. Through the Scheduler interface, you may also pause or resume each Schedule individually. If a scheduler is paused, it will not be polled for job task run.")]),e._v(" "),a("p",[e._v("A Schedule may also support a missedRunPolicy that tells scheduler how to handle in case when nextRun has missed the time to run. When it passes the max missed run interval allowed, which is configurable, the scheduler will use this policy value to determine what to do. The default policy is to simply skip to the current date time and continue again. However when this happens, we record and increase this Schedule's missedRunCount value so you may keep watch of it. Obvously we also track the normal Schedule.runCount as well.")]),e._v(" "),a("p",[e._v("In a nutshell, that's about how the scheduler works internally with these data models. We have a very flexible API in managing our scheduler system services, and we also allow user to make custom services to be register with the scheduler. All of the system services have well defined interfaces, and you are allow to swap any implementation you wish. For example we provide MemoryDataStore and HiberanteDataStore services that you may choose on how to persist your data. All these are configurable through the simple scheduler properties file. We shall cover some of these settings in future tour.")]),e._v(" "),a("p",[e._v("End of part 3. You may continue "),a("a",{attrs:{href:"http://saltnlight5.blogspot.com/2012/06/timemachine-scheduler-tour-part4.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("next tour"),a("OutboundLink")],1),e._v(", or see "),a("a",{attrs:{href:"http://saltnlight5.blogspot.com/2012/06/timemachine-scheduler-tour-part2.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("previous tour"),a("OutboundLink")],1),e._v(".")])])}),[],!1,null,null,null);t.default=s.exports}}]);