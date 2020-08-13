title=How to manage Quartz remotely
date=2012-08-27
type=post
tags=quartz
status=published
~~~~~~

## Option 1: JMX

Many people asked can they manage Quartz via JMX, and that the documentation on this is not clear enough to help them get started. So, let me highlight couple ways you can do this.

Yes you can enable JMX in quartz with the following in 
`quartz.properties`

    org.quartz.scheduler.jmx.export = true
    

After this, you use standard JMX client such as `$JAVA_HOME/bin/jconsole` to connect and manage remotely. 

## Option 2: RMI

Another way to manage quartz remotely is to enable RMI in Quartz. If you use this, you basically run one instance of Quartz as RMI server, and then 
you can create second Quartz instance as RMI client. These two can talk remotely via a TCP port. 

For server scheduler instance, you want to add these in `quartz.properties`

    org.quartz.scheduler.rmi.export = true
    org.quartz.scheduler.rmi.createRegistry = true
    org.quartz.scheduler.rmi.registryHost = localhost
    org.quartz.scheduler.rmi.registryPort = 1099
    org.quartz.scheduler.rmi.serverPort = 1100
    

And for client scheduler instance, you want to add these in `quartz.properties`

    org.quartz.scheduler.rmi.proxy = true
    org.quartz.scheduler.rmi.registryHost = localhost
    org.quartz.scheduler.rmi.registryPort = 1099
    

The RMI feature is mentioned in Quartz doc [here](http://quartz-scheduler.org/documentation/quartz-2.x/configuration/ConfigRMI). Quartz doesn't have 
a *client* API, but use the same `org.quartz.Scheduler` for both server and client. It's just the configuration are different.
By different configuration, you get very different behavior. For server, your scheduler is running all the jobs, while for client, it's simply a
proxy. Your client scheduler instance will not run any jobs! You must be really careful when shutting down client because it does allow you to bring
down the server!

These configurations have been highlighted in the [MySchedule](http://code.google.com/p/myschedule) project. If you run the webapp, you should see
a screen like [this demo](http://stormy-flower-6956.herokuapp.com/main/dashboard/create), and you will see it provided many sample of quartz configurations
with these remote managment config properties.

If configure with RMI option, you can actually still use MySchedule web UI to manage the Quartz as proxy. You can view and drill down jobs, and you can
even stop or shutdown remote server!

Based on my experience, there is a down side of using Quartz RMI feature though. That is it creates a single point of failure. There is no fail over 
if your RMI server port is down!