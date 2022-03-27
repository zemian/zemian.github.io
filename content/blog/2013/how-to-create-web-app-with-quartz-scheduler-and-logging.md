Title: How to create web-app with Quartz Scheduler and logging
Date: 2013-08-25 00:00:00-05:00
Tags: quartz



I sometimes help out users in Quartz Scheduler forums. Once in a while some one would
ask how can he/she setup the Quartz inside a web application. This is actualy a fairly
simple thing to do. The library already comes with a `ServletContextListener` that
you can use to start a Scheduler. I will show you a simple webapp example here.

First create a Maven `pom.xml` file.

    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation=
            "http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    
        <modelVersion>4.0.0</modelVersion>
    
        <groupId>quartz-web-demo</groupId>
        <artifactId>quartz-web-demo</artifactId>
        <packaging>war</packaging>
        <version>1.0-SANPSHOT</version>
    
        <dependencies>
            <dependency>
                <groupId>org.quartz-scheduler</groupId>
                <artifactId>quartz</artifactId>
                <version>2.2.0</version>
            </dependency>
        </dependencies>
    
    </project>

Then you need to create a `src/main/webapp/META-INF/web.xml` file.

    <?xml version="1.0" encoding="UTF-8"?>
     <web-app version="2.5"
        xmlns="http://java.sun.com/xml/ns/javaee"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation=
            "http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
    
         <context-param>
             <param-name>quartz:config-file</param-name>
             <param-value>quartz.properties</param-value>
         </context-param>
         <context-param>
             <param-name>quartz:shutdown-on-unload</param-name>
             <param-value>true</param-value>
         </context-param>
         <context-param>
             <param-name>quartz:wait-on-shutdown</param-name>
             <param-value>true</param-value>
         </context-param>
         <context-param>
             <param-name>quartz:start-on-load</param-name>
             <param-value>true</param-value>
         </context-param>
    
         <listener>
             <listener-class>org.quartz.ee.servlet.QuartzInitializerListener</listener-class>
         </listener>
    
     </web-app>

And lastly, you need a `src/main/resources/quartz.properties` config file for Scheduler.

    # Main Quartz configuration
    org.quartz.scheduler.skipUpdateCheck = true
    org.quartz.scheduler.instanceName = MyQuartzScheduler
    org.quartz.scheduler.jobFactory.class = org.quartz.simpl.SimpleJobFactory
    org.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool
    org.quartz.threadPool.threadCount = 5

You may configure
[many other things](http://quartz-scheduler.org/documentation/quartz-2.2.x/configuration/) with Quartz,
but above should get you started as in In-Memory scheduler.

Now you should able to compile and run it.

    bash> mvn compile
    bash> mvn org.apache.tomcat.maven:tomcat7-maven-plugin:2.1:run -Dmaven.tomcat.port=8081

## How to configure logging for Quartz Scheduler

Another frequently asked question is how do they setup logging and see the DEBUG level
messages. The Quartz Schedulers uses SLF4J, so you have many
[loggers options](https://zemian.github.io/2013/08/how-to-configure-slf4j-with-different.html)
to choose. I will show you how to setup Log4j for example below.

First, add this to your `pom.xml`

            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-log4j12</artifactId>
                <version>1.7.5</version>
            </dependency>

Then add `src/main/resources/log4j.properties` file to show messages onto STDOUT.

    log4j.rootLogger=INFO, stdout
    log4j.logger.org.quartz=DEBUG
    log4j.appender.stdout=org.apache.log4j.ConsoleAppender
    log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
    log4j.appender.stdout.layout.ConversionPattern=%5p [%t] (%F:%L) - %m%n

Restart your web application on command line, and now you should see all the DEBUG
level logging messages coming from Quartz library.

With everything running, your next question might be asking how do you access the scheduler
from your web application? Well, when the scheduler is created by the servlet context listener,
it is stored inside the web app&#8217;s ServletContext space with
`org.quartz.impl.StdSchedulerFactory.KEY` key. So you may retrieve it and use it in your
own Servlet like this:

    public class YourServlet extends HttpServlet {
        public init(ServletConfig cfg) {
            String key = "org.quartz.impl.StdSchedulerFactory.KEY";
            ServletContext servletContext = cfg.getServletContext();
            StdSchedulerFactory factory = (StdSchedulerFactory) servletContext.getAttribute(key);
            Scheduler quartzScheduler = factory.getScheduler("MyQuartzScheduler");
            // TODO use quartzScheduler here.
        }
    }

Now you are on your way to build your next scheduling application!

Have fun!

