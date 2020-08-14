---
title: Getting started with Apache Camel using Java
date: 2013-08-20
tags:
  - camel
---

Apache Camel is a very useful library that helps you process events or messages
from many different sources. You may move these messages through many different
protocols such as between VM, HTTP, FTP, JMS, or even DIRECTORY/FILE, and yet
still keep your processing code free of transport logic. This allows you to
concentrate on digesting the content of the messages instead.

Here I will provide a tutorial on how you can get started with Apache Camel using
Java.

Let&#8217;s start by creating a Maven project `pom.xml` file first.

    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://maven.apache.org/POM/4.0.0
            http://maven.apache.org/maven-v4_0_0.xsd">
    
        <modelVersion>4.0.0</modelVersion>
        <groupId>camel-spring-demo</groupId>
        <artifactId>camel-spring-demo</artifactId>
        <version>1.0-SNAPSHOT</version>
        <packaging>jar</packaging>
    
        <properties>
            <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
            <camel.version>2.11.1</camel.version>
        </properties>
    
        <dependencies>
            <dependency>
                <groupId>org.apache.camel</groupId>
                <artifactId>camel-core</artifactId>
                <version>${camel.version}</version>
            </dependency>
            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-simple</artifactId>
                <version>1.7.5</version>
            </dependency>
        </dependencies>
    
    </project>

We are only going to explore the `camel-core`, which actually contains quite of few useful
components that you may use. Also for logging purpose, I have added a `slf4j-simple` as
[a logger implementation](http://saltnlight5.blogspot.com/2013/08/how-to-configure-slf4j-with-different.html)
so we may see output on console.

Next you just need a class to construct an `Route`. A `Route` is like a instruction
definition to Camel on how to move your messages from one point to another. We are
going to create `src/main/java/camelcoredemo/TimerRouteBuilder.java` file that
will generate a timer message on every second, and then pass to a processor
that simply logs it.

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.builder.*;
    
    public class TimerRouteBuilder extends RouteBuilder {
        static Logger LOG = LoggerFactory.getLogger(TimerRouteBuilder.class);
        public void configure() {
            from("timer://timer1?period=1000")
            .process(new Processor() {
                public void process(Exchange msg) {
                    LOG.info("Processing {}", msg);
                }
            });
        }
    }

That&#8217;s all you needed to get started. Now you may build and run this simple
demo.

    bash> mvn compile
    bash> mvn exec:java -Dexec.mainClass=org.apache.camel.main.Main -Dexec.args='-r camelcoredemo.TimerRouteBuilder'

Notice that we didn&#8217;t even write a Java **main** class, but simply use the
`org.apache.camel.main.Main` option to accepts a `RouteBuilder` class
name as parameter. Then it will load and create the route automatically.

## Controlling the `CamelContext`

When you start Camel, it creates a `CamelContext` object that holds
many information on how to run it, including the definition of the
`Route` we created. Now if you want to have more control over this
`CamelContext`, then you would need to write your own `Main` class.
I will show you a simple one here.

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.impl.*;
    import org.apache.camel.builder.*;
    
    public class TimerMain {
        static Logger LOG = LoggerFactory.getLogger(TimerMain.class);
        public static void main(String[] args) throws Exception {
            new TimerMain().run();
        }
        void run() throws Exception {
            final CamelContext camelContext = new DefaultCamelContext();
            camelContext.addRoutes(createRouteBuilder());
            camelContext.setTracing(true);
            camelContext.start();
    
            Runtime.getRuntime().addShutdownHook(new Thread() {
                public void run() {
                    try {
                        camelContext.stop();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            });
    
            waitForStop();
        }
        RouteBuilder createRouteBuilder() {
            return new TimerRouteBuilder();
        }
        void waitForStop() {
            while (true) {
                try {
                    Thread.sleep(Long.MAX_VALUE);
                } catch (InterruptedException e) {
                    break;
                }
            }
        }
    }

As you can see, we re-used the existing `TimerRouteBuilder` class inside
`createRouteBuilder()` method. Our `Main` class now have full control
when to create, start and stop the
[`CamelContext`](http://camel.apache.org/maven/current/camel-core/apidocs/org/apache/camel/CamelContext.html).
This context allow you to have control on how to configure Camel
globally rather than on `Route` level. The javadoc link gives all the setter
methods that you can explore on what it can do.

Noticed that we also need to provide few setup codes in our `Main` class.
First we need to handle graceful shutdown, so we added a Java shutdown hook
to invoke the context `stop()`. Secondly we need to add a thread block after
context has started. The reason for this is that the `CamelContext#start()`
method is non-blocking! If you don&#8217;t block your `Main` thread after
start, then it will simply exit right after it, which will have not
much use. You want to run Camel as a service (like a server) until
you explicitly press `CTRL+C` to terminate the process.

## Improving the `Main` class to start `CamelContext`

If you don&#8217;t want to deal with much of the `Main` class setup
code such as above, then you may simply extends the `org.apache.camel.main.Main`
class provided by `camel-core` intead. By piggy-back on this class, you will
only not have your Context auto setup, but you will get all the additional
command line features such as controlling how long to run the
process for, enabling tracing, loading custom route class etc.

Refactoring previous example, here is how it look like.

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.builder.*;
    import org.apache.camel.main.Main;
    
    public class TimerMain2 extends Main {
        static Logger LOG = LoggerFactory.getLogger(TimerMain2.class);
        public static void main(String[] args) throws Exception {
            TimerMain2 main = new TimerMain2();
            main.enableHangupSupport();
            main.addRouteBuilder(createRouteBuilder());
            main.run(args);
        }
        static RouteBuilder createRouteBuilder() {
            return new TimerRouteBuilder();
        }
    }

Now our `TimerMain2` is much shorter, and you may try it out and it should
function the same as before.

    bash> mvn compile
    bash> mvn exec:java -Dexec.mainClass=camelcoredemo.TimerMain2 -Dexec.args='-t'

Notice that we have given `-t` option and it will dump `Route` tracing. Use `-h`
and you will see all the available options.

## Adding bean to the Camel `Registry`

In the `TimerRouteBuilder` example above, we have created a `Processor` on
the fly. Now if you were to combine few different `Processor` together, it
would be nicer to minimize the noise. Camel allow you to do this by registering
processing beans in their registry space, and then you simply reference them in
your route as `bean` component. Here is how I can convert above example into
beans processing.

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.builder.*;
    import org.apache.camel.main.Main;
    
    public class TimerBeansMain extends Main {
        static Logger LOG = LoggerFactory.getLogger(TimerBeansMain.class);
        public static void main(String[] args) throws Exception {
            TimerBeansMain main = new TimerBeansMain();
            main.enableHangupSupport();
            main.bind("processByBean1", new Bean1());
            main.bind("processAgainByBean2", new Bean2());
            main.addRouteBuilder(createRouteBuilder());
            main.run(args);
        }
        static RouteBuilder createRouteBuilder() {
            return new RouteBuilder() {
                    public void configure() {
                        from("timer://timer1?period=1000")
                        .to("bean:processByBean1")
                        .to("bean:processAgainByBean2");
                    }
                };
        }
    
        // Processor beans
        static class Bean1 implements Processor {
            public void process(Exchange msg) {
                LOG.info("First process {}", msg);
            }
        }
        static class Bean2 implements Processor {
            public void process(Exchange msg) {
                LOG.info("Second process {}", msg);
            }
        }
    }

Now you see my `Route` is very slim and without noise clutter; and I have
refactored my processing code into individual classes. This promotes better
code management and testing as you write more complex `Route` to address
business logic. It let you build LEGO like block of re-usable POJO beans.
Besides just processing beans, Camel use this registry space for many other
services as well. For example you may customize many other component endpoints
with additional features and or configurations. Or thing such as thread
pool strategy implementation replacement etc.

The `Route` in example above is constructed using what&#8217;s called Java DSL.
The route is very readable, and yet you&#8217;ll get full IDE support to browse all the methods available to use for your route.

I hope this article has helped you jump start your Camel ride. Besides the
`timer` component mentioned, the `camel-core` also comes with the following
components out of it&#8217;s core jar.

- 
[bean component](http://camel.apache.org/bean.html)

- 
[browse component](http://camel.apache.org/browse.html)

- 
[dataset component](http://camel.apache.org/dataset.html)

- 
[direct component](http://camel.apache.org/direct.html)

- 
[file component](http://camel.apache.org/file.html)

- 
[log component](http://camel.apache.org/log.html)

- 
[mock component](http://camel.apache.org/mock.html)

- 
[properties component](http://camel.apache.org/properties.html)

- 
[seda component](http://camel.apache.org/seda.html)

- 
[test component](http://camel.apache.org/test.html)

- 
[timer component](http://camel.apache.org/timer.html)

- 
[stub component](http://camel.apache.org/stub.html)

- 
[validator component](http://camel.apache.org/validation.html)

- 
[vm component](http://camel.apache.org/vm.html)

- 
[xslt component](http://camel.apache.org/xslt.html)

Have fun!