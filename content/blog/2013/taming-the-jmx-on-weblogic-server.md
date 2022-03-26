---
title: Taming the JMX on WebLogic Server
date: 2013-06-11T00:00:00-05:00
tags:
  - weblogic
  - jmx
---
Taming the JMX on WebLogic Server

# Taming the JMX on WebLogic Server

Let assume couple things first:

1) I assume you have heard of Java&#8217;s JMX features and familiar what it does (expose and manage your service remotely). You ought to know that default JVM will have a Platform MBeanServer instance that you can register MBean. And you may view them using the `jconsole` command from the JDK.

2) As of today, I think by far the easiest way you can expose any services in your application to a JMX MBeanServer is using Spring&#8217;s exporter. You will do something like this:
```
        <bean class="org.springframework.jmx.export.MBeanExporter">
            <property name="assembler">
                  <bean class="org.springframework.jmx.export.assembler.InterfaceBasedMBeanInfoAssembler">
                    <property name="managedInterfaces">
                        <list>
                            <!-- Expose any java interface you like to see under JMX as MBean -->
                            <value>myproject.services.Service</value>
                        </list>
                    </property>
                  </bean>
            </property>
            <property name="beans">
              <map>
                <entry key="myproject.services:name=MyCoolService" value-ref="myCoolService"/>
              </map>
            </property>
        </bean>
        <!-- This service must implements the interface used above -->
        <bean id="myCoolService" class="myproject.services.MyCoolService">
        </bean>
```
Above should get you standalone application with JMX enabled.

Now if you want to do similar on WebLogic Server, then I have few goodies and notes that might help you. Read on&#8230;

## WebLogic Server&#8217;s (WLS) MBeanServer

### The JConsole trick

The WLS, like many other EE server will have it&#8217;s own MBeanServer. However, to see the MBean&#8217;s you would need to do little extra with `jconsole`. Assume you have a default config WLS started on localhost, then you can connect to it like this.

    jconsole -J-Djava.class.path="$JAVA_HOME/lib/jconsole.jar:$MW_HOME/wlserver/server/lib/wljmxclient.jar" -J-Djmx.remote.protocol.provider.pkgs=weblogic.management.remote

Then when prompted to login, enter the following:

    Remote Process: service:jmx:iiop://localhost:7001/jndi/weblogic.management.mbeanservers.runtime
    User: <same userid you used setup WLS to their console app.>
    Password: <same password you used setup WLS to their console app.>

Now you should see all the MBeans that WLS already exposed to you as a EE server. You may add your own service there.

### Programming with JMX connection

You may connect to the WLS MBeanServer remotely inside your standalone application. Here is a typical connection code you would need
```
            String serviceName = "com.bea:Name=DomainRuntimeService,Type=weblogic.management.mbeanservers.domainruntime.DomainRuntimeServiceMBean";
            try {
                ObjectName service = new ObjectName(serviceName);
            } catch (MalformedObjectNameException e) {
                throw new RuntimeException("Not able to create JMX ObjectName: " + serviceName);
            }
    
            String protocol = "t3";
            String jndiroot = "/jndi/";
            String mserver = "weblogic.management.mbeanservers.runtime";
            try {
                JMXServiceURL serviceURL = new JMXServiceURL(protocol, "localhost", 7001, jndiroot + mserver);
    
                Hashtable h = new Hashtable();
                h.put(Context.SECURITY_PRINCIPAL, username);
                h.put(Context.SECURITY_CREDENTIALS, password);
                h.put(JMXConnectorFactory.PROTOCOL_PROVIDER_PACKAGES,
                        "weblogic.management.remote");
                h.put("jmx.remote.x.request.waiting.timeout", new Long(10000));
                JMXConnector connector = JMXConnectorFactory.connect(serviceURL, h);
                MBeanServerConnection remoteMBeanServer = connector.getMBeanServerConnection();
    
                // TODO: Do what you need with remoteMBeanServer here.
            } catch (Exception e) {
                throw new RuntimeException("Not able to initiate MBeanServer protocol= " + protocol +
                        ", jndiroot= " + jndiroot + ", mserver= " + mserver);
            }
```
That's a mouthful of boiler code just to get a remote MBeanServer connection! Fortunately there is another easier way though. Read on&#8230;

### The JNDI trick

The WLS MBeanServer service is also available through JNDI lookup. Again Spring can help you with their JNDI lookup and you simply need to inject it to other services that need it. For example:
```
        <bean id="jmxServerRuntime" class="org.springframework.jndi.JndiObjectFactoryBean">
            <property name="jndiName" value="java:comp/env/jmx/runtime"/>
        </bean>
        <bean id="exporter" class="org.springframework.jmx.export.MBeanExporter">
            <property name="beans">
                <map>
                    <entry key="myproject.services:name=MyCoolService" value-ref="myCoolService"/>
                </map>
            </property>
            <property name="server" ref="jmxServerRuntime"/>
        </bean>
```
Notice that we have injetcted the "server" property with one we looked up from WLS JNDI service. If you use that in your WAR application and deploy it onto a WLS instance, and whola, you got yourself exposed service onto WLS JMX!

Note

above will only works if your Spring xml config is part of the WAR/JAR/EAR that&#8217;s deployed in same server where JNDI lives! If you are not, you need to use this JNDI name without the "env" part instead, like "java:comp/env/jmx/runtime".

For more details on how to work with JMX and WLS, see their docs here:
[http://docs.oracle.com/cd/E12839_01/web.1111/e13728/accesswls.htm#i1119556](http://docs.oracle.com/cd/E12839_01/web.1111/e13728/accesswls.htm#i1119556)

Last updated 2013-06-12 23:52:42 EDT
