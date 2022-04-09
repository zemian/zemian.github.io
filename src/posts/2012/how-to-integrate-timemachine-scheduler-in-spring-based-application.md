---
title: How to integrate TimeMachine Scheduler in Spring based application
date: 2012-08-17T00:00:00-05:00
tags:
  - timemachine
  - spring
---

One of the goals for [TimeMachine Scheduler](https://bitbucket.org/timemachine/scheduler) is to make use of POJO as friendly as possible so that we can integrate into any IoC container easily. I've prepared a demo that will show you how to integrate TimeMachine with [Spring](http://www.springsource.org/) based application. 

We will mainly focus on the Spring xml config part in this article, so if you don't feel like checking out the  [demo project source code](https://bitbucket.org/timemachine/scheduler-demo/src/fab518eb64ce/scheduler-spring) in details, then simply grab the binary package of the  [timemachine-spring-demo.zip](https://bitbucket.org/timemachine/scheduler-demo/downloads) and follow along.

# Introducing a tiny Spring Server

If you don't already have a Spring project going, then take a look at my little Spring server. It can bootstrap any spring configuration xml file and then sits and wait for a `CTRL+C` to end. Unzip the demo and try it out like this.

    $ cd timemachine-spring-demo
    $ bin/run-spring config/hello-spring.xml
    

You should see a "Hello World!" message printed. Hit `CTRL+C` to end it. The xml just declares a simple `HelloService` bean like this.

```
    <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
    
        <bean id="helloService" class="timemachine.spring.HelloService" init-method="run">
            <property name="name" value="World"></property>
        </bean>
    
    </beans>
```

That's your typical Spring declaration file. With this tiny Spring server, you can quickly experiment any POJOs wired up in any way you wish and put them in action.

# Setting up TimeMachine Scheduler beans

In Java code, you can easily create an instance of the TimeMachine scheduler as follow:

```
    SchedulerFactory schedulerFactory = new SchedulerFactory("config/scheduler.properties");
    Scheduler scheduler = schedulerFactory.createScheduler();
    scheduler.start();
    // Then we would also need to call scheduler.destroy() before we exit the Java program. (eg: in shutdownHook)
```

You can easily translate that into Spring xml config like in `config/timemachine-pojo-spring.xml`:

```
    <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
    
        <bean id="schedulerFactory" class="timemachine.scheduler.SchedulerFactory">
            <constructor-arg value="config/scheduler.properties"></constructor-arg>
        </bean>
        <bean id="scheduler" class="timemachine.scheduler.Scheduler" 
            factory-bean="schedulerFactory" factory-method="createScheduler"
            init-method="start" destroy-method="destroy">
        </bean>
    
    </beans>
```    

The benefit of using Spring xml is that your scheduler lifecycles would be automatically taken care of without setting any shutdown hook. Running above should give you a plain scheduler started, and pressing `CTRL+C` should shutdown gracefully. 

# Going further with a custom SchedulerFactoryBean

Now above is not much excitement using Spring since you would still configure the scheduler through `config/scheduler.properties`. You certainly can load jobs and add custom services there. But if we are going to use Spring, we might as well take full advantage of it to create the Job Definition and Schedule inside the xml config! To do this, I created a simple `timemachine.scheduler.spring.SchedulerFactoryBean` in my demo project, and you can try it out like this:

```
    <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
    
        <bean id="scheduler" class="timemachine.scheduler.spring.SchedulerFactoryBean">
            <property name="configPropsUrl" value="config/scheduler.properties"></property>
            <property name="autoStart" value="true"></property>
            <property name="autoAddJobDef" value="true"></property>
        </bean>
        <bean id="jobDef01" class="timemachine.scheduler.JobDef">
            <property name="jobTaskClassName" value="timemachine.scheduler.jobtask.ScriptingJobTask"></property>
            <property name="props">
                <map>
                    <entry key="scriptEngineName" value="Groovy"></entry>
                    <entry key="scriptText" value="println('Hello World.')"></entry>
                </map>
            </property>
            <property name="schedules">
                <list>              
                    <bean class="timemachine.scheduler.schedule.CronSchedule">
                        <property name="expression" value="0/3 * * * * ?"></property>
                    </bean>
                </list>
            </property>
        </bean>
    
    </beans>
```    

Above will create not only the scheduler but also auto manage the lifecycles for you without you explicitly declare it. The factory bean will also auto detect any JobDef and Schedule bean types and add them into the scheduler instance. This would make your scheduler config all in the Spring xml, and it's well integrated.

There is also another similar sample in `config/timemachine-spring.xml` you may try. It will invoke an external groovy script instead of inline text.

# Going extra mile on exposing TimeMachine Scheduler through JMX

The TimeMachine doesn't support any JMX instrumentation, however when running with the Spring, you can easily expose any Java interface to the local MBean Server Platform using Spring's MBeanExporter. For example in `config/timemachine-jmx-spring.xml` you will see:

```
    <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
    
        <bean id="scheduler" class="timemachine.scheduler.spring.SchedulerFactoryBean">
            <property name="configPropsUrl" value="config/scheduler.properties"/>
        </bean> 
        <bean id="exporter" class="org.springframework.jmx.export.MBeanExporter">
            <property name="assembler">
                <bean class="org.springframework.jmx.export.assembler.InterfaceBasedMBeanInfoAssembler">
                    <property name="managedInterfaces">
                        <list>
                            <value>timemachine.scheduler.Scheduler</value>
                        </list>
                    </property>
                </bean>
            </property>
            <property name="beans">
                <map>
                    <entry key="timemachine.scheduler:name=Scheduler" value-ref="scheduler"/>
                </map>
            </property>
        </bean>
    
    </beans>
```    

Above will start an empty scheduler, and expose the `timemachine.scheduler.Scheduler` interface to the JMX local server. You may use `$JAVA_HOME/bin/jconsole` to connect and will see all the methods automatically exposed. There few methods that contains custom java objects that exporter will not able to convert properly, but at least you will get all the lifecycles and some simple getters that available to you.
