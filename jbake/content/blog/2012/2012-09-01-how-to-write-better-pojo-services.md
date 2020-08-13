title=How to write better POJO Services
date=2012-09-01
type=post
tags=java
status=published
~~~~~~

In Java, you can easily implement some business logic in Plain Old Java Object (POJO) classes, and then able to run them in a fancy
server or framework without much hassle. There many server/frameworks, such as JBossAS, Spring or Camel etc, that 
would allow you to deploy POJO without even hardcoding to their API. Obviously you would get advance features if you willing to couple to
their API specifics, but even if you do, you can keep these to minimal by encapsulating your own POJO and their API in a wrapper. 
By writing and designing your own application as simple POJO as possible, you will have the most flexible ways in choose a framework or server to 
deploy and run your application. One effective way to write your business logic in these environments is to use *Service* component. 
In this article I will share few things I learned in writing *Services*.

# What is a Service?

The word *Service* is overly used today, and it could mean many things to different people. When I say *Service*, my definition is a software 
component that has minimal of life-cycles such as `init`, `start`, `stop`, and `destroy`. You may not need all these
stages of life-cycles in every service you write, but you can simply ignore ones that don't apply. When writing large application that 
intended for long running such as a server component, definining these life-cycles and ensure they are excuted in proper order is crucial!

I will be walking you through a Java demo project that I have prepared. It's very basic and it should run as stand-alone. The only dependency it has is
the [SLF4J](http://www.slf4j.org) logger. If you don't know how to use logger, then simply replace them with `System.out.println`. However I would strongly 
encourage you to learn how to use logger effectively during application development though. Also if you want to try out the 
[Spring](http://www.springsource.org/spring-framework) related demos, then obviously you would need their jars as well.

# Writing basic POJO service

You can quickly define a contract of a Service with life-cycles as below in an interface.

    package servicedemo;
    
    public interface Service {
        void init();
        void start();
        void stop();
        void destroy();
        boolean isInited();
        boolean isStarted();
    }
    

Developers are free to do what they want in their Service implementation, but you might want to give them an adapter class so that 
they don't have to re-write same basic logic on each Service. I would provide an abstract service like this:

    package servicedemo;
    
    import java.util.concurrent.atomic.*;
    import org.slf4j.*;
    public abstract class AbstractService implements Service {
        protected Logger logger = LoggerFactory.getLogger(getClass());
        protected AtomicBoolean started = new AtomicBoolean(false);
        protected AtomicBoolean inited = new AtomicBoolean(false);
    
        public void init() {
            if (!inited.get()) {
                initService();
                inited.set(true);
                logger.debug("{} initialized.", this);
            }
        }
    
        public void start() {
            // Init service if it has not done so.
            if (!inited.get()) {
                init();
            }
            // Start service now.
            if (!started.get()) {
                startService();
                started.set(true);
                logger.debug("{} started.", this);
            }
        }
    
        public void stop() {
            if (started.get()) {
                stopService();
                started.set(false);
                logger.debug("{} stopped.", this);
            }
        }
    
        public void destroy() {
            // Stop service if it is still running.
            if (started.get()) {
                stop();
            }
            // Destroy service now.
            if (inited.get()) {
                destroyService();
                inited.set(false);
                logger.debug("{} destroyed.", this);
            }
        }
    
        public boolean isStarted() {
            return started.get();
        }
    
        public boolean isInited() {
            return inited.get();
        }
    
        @Override
        public String toString() {
                return getClass().getSimpleName() + "[id=" + System.identityHashCode(this) + "]";
        }
    
        protected void initService() {
        }
    
        protected void startService() {
        }
    
        protected void stopService() {
        }
    
        protected void destroyService() {
        }
    }
    

This abstract class provide the basic of most services needs. It has a logger and states to keep track of the life-cycles. It then delegate new
sets of life-cycle methods so subclass can choose to override. Notice that the `start()` method is checking auto calling `init()` if it hasn't 
already done so. Same is done in `destroy()` method to the `stop()` method. This is important if we're to use it in a container that only have 
two stages life-cycles invocation. In this case, we can simply invoke `start()` and `destroy()` to match to our service's life-cycles.

Some frameworks might go even further and create separate interfaces for each stage of the life-cycles, such as `InitableService` or 
`StartableService` etc. But I think that would be too much in a typical app. In most of the cases, you want something simple, so I like it just
one interface. User may choose to ignore methods they don't want, or simply use an adaptor class.

Before we end this section, I would throw in a silly Hello world service that can be used in our demo later.

    package servicedemo;
    
    public class HelloService extends AbstractService {
        public void initService() {
            logger.info(this + " inited.");
        }
        public void startService() {
            logger.info(this + " started.");
        }
        public void stopService() {
            logger.info(this + " stopped.");
        }
        public void destroyService() {
            logger.info(this + " destroyed.");
        }
    }
    

# Managing multiple POJO Services with a container

Now we have the basic of *Service* definition defined, your development team may start writing business logic code! Before long, you will have 
a library of your own services to re-use. To be able group and control these services into an effetive way, we want also provide a container 
to manage them. The idea is that we typically want to control and manage multiple services with a container as a group in a higher level. Here 
is a simple implementation for you to get started:

    package servicedemo;
    
    import java.util.*;
    public class ServiceContainer extends AbstractService {
        private List<Service> services = new ArrayList<Service>();
    
        public void setServices(List<Service> services) {
            this.services = services;
        }
        public void addService(Service service) {
            this.services.add(service);
        }
    
        public void initService() {
            logger.debug("Initializing " + this + " with " + services.size() + " services.");
            for (Service service : services) {
                logger.debug("Initializing " + service);
                service.init();
            }
            logger.info(this + " inited.");
        }
        public void startService() {
                logger.debug("Starting " + this + " with " + services.size() + " services.");
                for (Service service : services) {
                    logger.debug("Starting " + service);
                    service.start();
                }
                logger.info(this + " started.");
        }
        public void stopService() {
                int size = services.size();
                logger.debug("Stopping " + this + " with " + size + " services in reverse order.");
                for (int i = size - 1; i >= 0; i--) {
                    Service service = services.get(i);
                    logger.debug("Stopping " + service);
                    service.stop();
                }
                logger.info(this + " stopped.");
        }
        public void destroyService() {
                int size = services.size();
                logger.debug("Destroying " + this + " with " + size + " services in reverse order.");
                for (int i = size - 1; i >= 0; i--) {
                    Service service = services.get(i);
                    logger.debug("Destroying " + service);
                    service.destroy();
                }
                logger.info(this + " destroyed.");
        }
    }
    

From above code, you will notice few important things:

1. We extends the AbstractService, so a container is a service itself.
2. We would invoke all service's life-cycles before moving to next. No services will start unless all others are inited.
3. We should stop and destroy services in reverse order for most general use cases.

The above container implementation is simple and run in synchronized fashion. This mean, you start container, then all services
will start in order you added them. Stop should be same but in reverse order. 

I also hope you would able to see that there is plenty of room for you to improve this container as well. For example, you may 
add thread pool to control the execution of the services in asynchronized fashion.

# Running POJO Services

## Running services with a simple runner program.

In the simplest form, we can run our POJO services on our own without any fancy server or frameworks. Java programs start its life from a 
static `main` method, so we surely can invoke `init` and `start` of our services in there. But we also need to address the `stop` and `destroy`
life-cycles when user shuts down the program (usually by hitting `CTRL+C`.) For this, the Java has the `java.lang.Runtime#addShutdownHook()`
facility. You can create a simple stand-alone server to bootstrap *Service* like this:

    package servicedemo;
    
    import org.slf4j.*;
    public class ServiceRunner {
        private static Logger logger = LoggerFactory.getLogger(ServiceRunner.class);
    
        public static void main(String[] args) {
            ServiceRunner main = new ServiceRunner();
            main.run(args);
        }
    
        public void run(String[] args) {
            if (args.length < 1)
                throw new RuntimeException("Missing service class name as argument.");
    
            String serviceClassName = args[0];
            try {
                logger.debug("Creating " + serviceClassName);
                Class<?> serviceClass = Class.forName(serviceClassName);
                if (!Service.class.isAssignableFrom(serviceClass)) {
                    throw new RuntimeException("Service class " + serviceClassName + " did not implements " + Service.class.getName());
                }
                Object serviceObject = serviceClass.newInstance();
                Service service = (Service)serviceObject;
    
                registerShutdownHook(service);
    
                logger.debug("Starting service " + service);
                service.init();
                service.start();
                logger.info(service + " started.");
    
                synchronized(this) {
                    this.wait();
                }
            } catch (Exception e) {
                throw new RuntimeException("Failed to create and run " + serviceClassName, e);
            }
        }
    
        private void registerShutdownHook(final Service service) {
            Runtime.getRuntime().addShutdownHook(new Thread() {
                public void run() {
                    logger.debug("Stopping service " + service);
                    service.stop();
                    service.destroy();
                    logger.info(service + " stopped.");
                }
            });
        }
    }
    

With abover runner, you should able to run it with this command:

    $ java demo.ServiceRunner servicedemo.HelloService
    

Look carefully, and you'll see that you have many options to run multiple services with above runner. Let me highlight couple:

1. Improve above runner directly and make all `args` for each new service class name, instead of just first element.
2. Or write a `MultiLoaderService` that will load multiple services you want. You may control argument passing using System Properties.

Can you think of other ways to improve this runner?

## Running services with Spring

The Spring framework is an IoC container, and it's well known to be easy to work POJO, and Spring lets you wire your application 
together. This would be a perfect fit to use in our POJO services. However, with all the features Spring brings, it missed a easy
to use, out of box *main* program to bootstrap spring config xml context files. But with what we built so far, this is actually an
easy thing to do. Let's write one of our POJO *Service* to bootstrap a spring context file.

    package servicedemo;
    
    import org.springframework.context.ConfigurableApplicationContext;
    import org.springframework.context.support.FileSystemXmlApplicationContext;
    
    public class SpringService extends AbstractService {
        private ConfigurableApplicationContext springContext;
    
        public void startService() {
            String springConfig = System.getProperty("springContext", "spring.xml);
            springContext = new FileSystemXmlApplicationContext(springConfig);
            logger.info(this + " started.");
        }
        public void stopService() {
            springContext.close();
            logger.info(this + " stopped.");
        }
    }
    

With that simple `SpringService` you can run and load any spring xml file. For example try this:

    $ java -DspringContext=config/service-demo-spring.xml demo.ServiceRunner servicedemo.SpringService
    

Inside the `config/service-demo-spring.xml` file, you can easily create our container that hosts one or more service in Spring beans.

    <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    
        <bean id="helloService" class="servicedemo.HelloService">
        </bean>
    
        <bean id="serviceContainer" class="servicedemo.ServiceContainer" init-method="start" destroy-method="destroy">
            <property name="services">
                <list>
                    <ref bean="helloService"/>
                </list>
            </property>
        </bean>
    
    </beans>
    

Notice that I only need to setup `init-method` and `destroy-method` once on the `serviceContainer` bean. You can then add one or more
other service such as the `helloService` as much as you want. They will all be started, managed, and then shutdown when you close the
Spring context.

Note that Spring context container did not explicitly have the same life-cycles as our services. The Spring context will automatically
instanciate all your dependency beans, and then invoke all beans who's `init-method` is set. All that is done inside the constructor
of `FileSystemXmlApplicationContext`. No explicit init method is called from user. However at the end, during stop of the service, Spring provide
the `springContext#close()` to clean things up. Again, they do not differentiate `stop` from `destroy`. Because of this, we must merge our
`init` and `start` into Spring's `init` state, and then merge `stop` and `destroy` into Spring's `close` state. Recall our 
`AbstractService#destory` will auto invoke `stop` if it hasn't already done so. So this is trick that we need to understand
in order to use Spring effectively.

## Running services with JEE app server

In a corporate env, we usually do not have the freedom to run what we want as a stand-alone program. Instead they usually have some 
infrustructure and stricter standard technology stack in place already, such as using a JEE application server. In these situation, the most 
portable way to run POJO services is in a `war` web application. In a Servlet web application, you can write a class that implements 
`javax.servlet.ServletContextListener` and this will provide you the life-cycles hook via `contextInitialized` and `contextDestroyed`.
In there, you can instanciate your `ServiceContainer` object and call `start` and `destroy` methods accordingly.

Here is an example that you can explore:

    package servicedemo;
    import java.util.*;
    import javax.servlet.*;
    public class ServiceContainerListener implements ServletContextListener {
        private static Logger logger = LoggerFactory.getLogger(ServiceContainerListener.class);
        private ServiceContainer serviceContainer;
    
        public void contextInitialized(ServletContextEvent sce) {
            serviceContainer = new ServiceContainer();
            List<Service> services = createServices();
            serviceContainer.setServices(services);
            serviceContainer.start();
            logger.info(serviceContainer + " started in web application.");
        }
    
        public void contextDestroyed(ServletContextEvent sce) {
            serviceContainer.destroy();
            logger.info(serviceContainer + " destroyed in web application.");
        }
    
        private List<Service> createServices() {
            List<Service> result = new ArrayList<Service>();
            // populate services here.
            return result;
        }
    }
    

You may configure above in the `WEB-INF/web.xml` like this:
    

        <listener>
            <listener-class>servicedemo.ServiceContainerListener</listener-class>
        </listener>
    
    </web-app>
    

The demo provided a placeholder that you must add your services in code. But you can easily make that configurable using the `web.xml` for
context parameters.

If you were to use Spring inside a Servlet container, you may directly use their `org.springframework.web.context.ContextLoaderListener` 
class that does pretty much same as above, except they allow you to specify their xml configuration file using the
`contextConfigLocation` context parameter. That's how a typical Spring MVC based application is configure. Once you have this setup, you
can experiment our POJO service just as the Spring xml sample given above to test things out. You should see our service in action by
your logger output.

PS: Actually what we described here are simply related to Servlet web application, and not JEE specific. So you can use Tomcat server just
fine as well.

# The importance of Service's life-cycles and it's real world usage

All the information I presented here are not novelty, nor a killer design pattern. In fact they have been used in many popular open source projects.
However, in my past experience at work, folks always manage to make these extremely complicated, and worse case is that they completely disregard the 
importance of life-cycles when writing services. It's true that not everything you going to write needs to be fitted into a service, but if you find
the need, please do pay attention to them, and take good care that they do invoked properly. The last thing you want is to exit JVM without clean up
in services that you allocated precious resources for. These would become more disastrous if you allow your application to be dynamically reloaded during
deployment without exiting JVM, in which will lead to system resources leakage.

The above *Service* practice has been put into use in the [TimeMachine](https://bitbucket.org/timemachine/scheduler) project. In fact, if you 
look at the `timemachine.scheduler.service.SchedulerEngine`, it would just be a container of many [services](https://bitbucket.org/timemachine/scheduler/src/15f066cc6dad/timemachine-scheduler/src/main/java/timemachine/scheduler/service) 
running together. And that's how user can extend the scheduler functionalities as well, by writing a *Service*. You can load these services dynamically by a simple properties file.