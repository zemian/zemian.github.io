Title: First snapshot of myschedule-3.0.0 is available
Date: 2013-03-27 00:00:00-05:00
Tags: myschedule



First snapshot of [myschedule-3.0.0](https://code.google.com/p/myschedule/downloads/list) with brand new UI is ready to be try out! 

It's been a long time since I made a release for MySchedule project, and I have been busy!

Well, for starter, I have been exploring the Vaaddin library for a new UI design for the project, and it's working really nice! I love to have full Java code for UI layout and widget controls and yet it runs on browser. It's a perfect fit for MySchedule. As you will see from the snapshot, the UI is still pretty bare, but for me, as backend developer, and be able to have such clean UI code is super exciting. (on other hand, working with JavaScript, even with such nice library as jQuery can still feel like a hack at times. ^_^) You should checkout the latest MySchedule source to take a look yourself. All that GUI is less than handful of UI classes. Vaaddin is pretty sweet!

As MySchedule jumped to 3.x version, I've taken the opportunity to clean up few areas in the "quartz-extra" module as well. Also to support Vaadin, the web layer needed a rework. The new code is easy to follow and ready to support more UI features in the future.

I also improved on the project packaging. Now getting started with is even more easier. Get the single zip file, and try any of these simple steps:

```    
    ## Web application usage (option 1: power up a self-contained servlet server!)
     
     bash> cd myschedule-3.*
     bash> bin/myschedule-ui.sh --httpPort=8081
    
    Now open a browser and visit http://localhost:8081
    
    ## Web application usage (option 2: use your own servelt server)
    
    Simply copy the myschedule-3.*/war/myschedule.war file into your Servlet container such as Tomcat.
    
    ## Command line usage (option 3: quickly test your quartz config)
    
     bash> cd myschedule-3.*
     bash> bin/myschedule.sh bin/quartz.properties
```    

Note that not all MySchedule-2.x features are in the 3.0 snapshot yet. For now, you would need to use the ScripConsole window to enter jobs into the scheduler. There are now new templates UI available for you to choose and start working quickly. I am still working on allowing users to save their own templates and edit them. This should give users more rich experience in using the UI manager.

