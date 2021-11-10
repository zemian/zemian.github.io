---
title: Building message based application using Camel
date: 2012-09-14T00:00:00-05:00
tags:
  - camel
---

This is a long article that contains three separate topics:

- Getting started with Apache Camel with Java
- Improving startup of routes with a CamelRunner
- Building message based application using Camel

But since I've prepared a [camel-demo-1.0.0-SNAPSHOT-project.zip](https://bitbucket.org/saltnlight5/sandbox/downloads) that has all these materials included, I thought it would easier to combine them and present it as whole.

# Getting started with Apache Camel with Java

Trying out [Camel with few Groovy lines](http://saltnlight5.blogspot.com/2012/08/getting-started-with-apache-camel-using.html) is one thing, but 
getting a full scale project in Java is another matter. Today, I will show you how to get things started on [Apache Camel](http://camel.apache.org/) with 
[Maven](http://maven.apache.org/) based project. You may also use the provided `camel-demo` as project template to jump start your own Apache Camel 
project. You would just need to rename the Java package and rename the pom's group and artifact id's to match your need.

## Preparing a Maven based project with Camel dependencies

Unzip the `camel-demo` project source, and you will see the basic directory layout.

```
    camel-demo
        +- bin
        +- config
        +- data
        +- src
        +- pom.xml
        +- README.txt
```    

What makes this demo a Camel based project is just the declaration in `pom.xml`. Let's take a look the file and its dependencies.

```
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0   http://maven.apache.org/maven-v4_0_0.xsd">
    
        <modelVersion>4.0.0</modelVersion>
        <groupId>deng.cameldemo</groupId>
        <artifactId>camel-demo</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <packaging>jar</packaging>
    
        <properties>
            <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
            <slf4j.version>1.6.6</slf4j.version>
            <camel.version>2.10.1</camel.version>
        </properties>
    
        <build>
            <plugins>
                <plugin>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>2.3.2</version>
                    <configuration>
                        <source>1.6</source>
                        <target>1.6</target>
                    </configuration>
                </plugin>
                <plugin>
                    <artifactId>maven-assembly-plugin</artifactId>
                    <version>2.3</version>
                    <configuration>
                        <descriptorRefs>
                            <descriptorRef>project</descriptorRef>
                            <descriptorRef>jar-with-dependencies</descriptorRef>
                        </descriptorRefs>
                    </configuration>
                    <executions>
                        <execution>
                            <id>make-assembly</id>
                            <phase>package</phase>
                            <goals>
                                <goal>single</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    
        <dependencies>
    
            <!-- Unit testing lib -->
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit-dep</artifactId>
                <version>4.10</version>
                <scope>test</scope>
            </dependency>
            <dependency>
                <groupId>org.hamcrest</groupId>
                <artifactId>hamcrest-library</artifactId>
                <version>1.2.1</version>
                <scope>test</scope>
            </dependency>
    
            <!-- Logging lib -->
            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-api</artifactId>
                <version>${slf4j.version}</version>
            </dependency>
            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-log4j12</artifactId>
                <version>${slf4j.version}</version>
                <scope>runtime</scope>
                <optional>true</optional>
            </dependency>
    
            <!-- Apache Commons lib -->
            <dependency>
                <groupId>commons-lang</groupId>
                <artifactId>commons-lang</artifactId>
                <version>2.6</version>
            </dependency>
            <dependency>
                <groupId>commons-io</groupId>
                <artifactId>commons-io</artifactId>
                <version>2.0.1</version>
            </dependency>
    
            <!-- Apache Camel -->
            <dependency>
                <groupId>org.apache.camel</groupId>
                <artifactId>camel-core</artifactId>
                <version>${camel.version}</version>
            </dependency>
            <dependency>
                <groupId>org.apache.camel</groupId>
                <artifactId>camel-spring</artifactId>
                <version>${camel.version}</version>
            </dependency>
            <dependency>
                <groupId>org.apache.camel</groupId>
                <artifactId>camel-groovy</artifactId>
                <version>${camel.version}</version>
            </dependency>
            <dependency>
                <groupId>org.apache.camel</groupId>
                <artifactId>camel-jackson</artifactId>
                <version>${camel.version}</version>
            </dependency>
            <dependency>
                <groupId>org.apache.camel</groupId>
                <artifactId>camel-mina</artifactId>
                <version>${camel.version}</version>
            </dependency>
    
        </dependencies>
    
    </project>
```   

This `pom.xml` decalares a Java based application and it will produce `jar`. It requires minimal of JDK 6 or higher. Besides the typical `junit` and `hamcrest` for unit testing, I also added `slf4j` for logging. I have added couple Apache's `commons-lang/io` to the project as well. I think these are basic settings that any Java based application should use them.

The `maven-assembly-plugin` I have declared is only for this demo packging purpose, and you may change or remove to suite your own project need. 

For Camel dependencies, you would need minimal `camel-core` for routes building. And then you can add any additional components you plan to use in your project. I have added the following for building typical message based application development:

1. The `camel-spring` - we want to have option to declare Camel routes in xml files as configuration. See `camel-demo/config` directory for samples.
2. The `camel-jackson` - we want to process messaging data in our application as JSON format.
3. The `camel-mina` - we want to send messaging data accross network through TCP socket.
4. The `camel-groovy` - [optional] we want to be able to add dynamic scripting to route, even inside the xml config. This is great for debug and POC.

Note that since we use multiple camel components dependencies, I choose to set a Maven property `${camel.version}` so that when we upgrade Camel, 
it's easier to maintain the `pom.xml` file in one place. 

You should able to cd into the project directory and run `mvn compile` to verify that the project. It should compile without error.

# Improving startup of routes with a CamelRunner

With the project `pom.xml` file ready, you can start creating Camel routes to handle your own business logics. Before we get too excited, let's try out
a simple `HelloRoute` to see how it works and how we can run it first. Here is the route defnition code in `src/main/java/deng/cameldemo/HelloRoute.java`.

```
    package deng.cameldemo;
    
    import org.apache.camel.builder.RouteBuilder;
    
    public class HelloRoute extends RouteBuilder {
        @Override
        public void configure() throws Exception {
            from("timer://helloTimer?period=3000").
                to("log:" + getClass().getName());
        }
    }
```    

## Take a test ride with the Camel

To see above in action, we need to add it into a `CamelContext` and start the context. For Java standalone program, we would write this setup code
in a `Main` class. The Camel actually comes with a `org.apache.camel.main.MainSupport` abstract class that you may use to extend your own `Main`. 
However, I think it would be even nicer if Camel would provide a `CamelRunner` that can run like this.

    $ java CamelRunner deng.cameldemo.HelloRoute
    

Such `CamelRunner` would be very user friendly and re-usable to have, so that's what I did. I wrote one like this:

```
    package deng.cameldemo;
    
    import org.apache.camel.CamelContext;
    import org.apache.camel.builder.RouteBuilder;
    import org.apache.camel.impl.DefaultCamelContext;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.context.ConfigurableApplicationContext;
    import org.springframework.context.support.FileSystemXmlApplicationContext;
    
    /** 
     * A main program to start Camel and run as a server using RouteBuilder class names or 
     * Spring config files.
     * 
     * <p>Usage:
     * 
     * java deng.cameldemo.CamelRunner deng.cameldemo.HelloRoute
     * 
     * or
     * 
     * java -Dspring=true deng.cameldemo.CamelRunner /path/to/camel-spring.xml
     * 
     * @author Zemian Deng
     */
    public class CamelRunner {
        public static void main(String[] args) throws Exception {
            CamelRunner runner = new CamelRunner();
            runner.run(args);
        }
    
        private static Logger logger = LoggerFactory.getLogger(CamelRunner.class);
        public void run(String[] args) throws Exception {
            if (Boolean.parseBoolean(System.getProperty("spring", "false")))
                runWithSpringConfig(args);
            else
                runWithCamelRoutes(args);
    
            // Wait for user to hit CRTL+C to stop the service
            synchronized(this) {
                this.wait();
            }
        }
    
        private void runWithSpringConfig(String[] args) {
            final ConfigurableApplicationContext springContext = new FileSystemXmlApplicationContext(args);
    
            // Register proper shutdown.
            Runtime.getRuntime().addShutdownHook(new Thread() { 
                @Override
                public void run() {
                    try {
                        springContext.close();
                        logger.info("Spring stopped.");
                    } catch (Exception e) {
                        logger.error("Failed to stop Spring.", e);
                    }
                }
            });
    
            // Start spring
            logger.info("Spring started.");
        }
    
        private void runWithCamelRoutes(String[] args) throws Exception {
            final CamelContext camelContext = new DefaultCamelContext();        
            // Register proper shutdown.
            Runtime.getRuntime().addShutdownHook(new Thread() { 
                @Override
                public void run() {
                    try {
                        camelContext.stop();
                        logger.info("Camel stopped for {}", camelContext);
                    } catch (Exception e) {
                        logger.error("Failed to stop Camel.", e);
                    }
                }
            });
    
            // Added RouteBuilder from args
            for (String className : args) {
                Class<?> cls = Class.forName(className);
                if (RouteBuilder.class.isAssignableFrom(cls)) {
                    Object obj = cls.newInstance();
                    RouteBuilder routeBuilder = (RouteBuilder)obj;
                    camelContext.addRoutes(routeBuilder);
                } else {
                    throw new RuntimeException("Unable to add Camel RouteBuilder " + className);
                }
            }
    
            // Start camel
            camelContext.start();
            logger.info("Camel started for {}", camelContext);
        }
    }
```    

To help you run the main class, I have provided a [run-java](http://saltnlight5.blogspot.com/2012/08/a-better-java-shell-script-wrapper.html) 
wrapper script under the project's `bin` directory, so that you may quickly test it without having to setup classpath.

    $ mvn package
    $ bin/run-java deng.cameldemo.CamelRunner deng.cameldemo.HelloRoute
    

You will see that the program will load the `HelloRoute` in a `DefaultCamelContext` and start it as a server. The `HelloRoute` itself will 
generate a 3 seconds timer message and send it to a logger, which should be printing onto your console screen. This will continue forever 
until you hit `CTRL+C` to end it.

NOTE: You only have to invoke `mvn package` command once, so that it will package up all the dependencies jars in order for `run-java` to auto-detect
them. If you are not going to use `maven-assembly-plugin` during `package` phase, then use `mvn dependency:copy-dependencies` command 
explicitly will work fine as well.

## Take a test ride with the Camel, Part 2: running Camel with Spring xml configuration

The `HelloRoute` example above would simply provide route definition that formed by using component URI's. It will be nice if
we can configure the route in a declarative manner so that we may change the route without re-compile a class file. This will be very handy especially
if you are not familiar with each component's options and want to explore and try things out. Well, that's what the `camel-spring` is for. Beside 
giving you an option to load route in xml config file, it also provides a very flexible way to register custom services/processors bean in the Spring
IoC container.

If you are a keen reader, you will notice in the `CamelRunner` code above that it has an extra `runWithSpringConfig` part. So the `CamelRunner` 
can actually bootstrap any Spring xml file and start a context as a server. You may use it like this:

    $ bin/run-java deng.cameldemo.CamelRunner -Dspring=true config/hellocamel-spring.xml
    

The `config/hellocamel-spring.xml` is just an equivalent of our `HelloRoute` code but in Spring xml form:

```
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
            http://camel.apache.org/schema/spring http://camel.apache.org/schema/spring/camel-spring.xsd">
    
        <camelContext id="helloCamel" xmlns="http://camel.apache.org/schema/spring">
            <route>
                <from uri="timer://jdkTimer?period=3000"/>
                <to uri="log://deng.cameldemo.HelloCamel"/>
            </route>
        </camelContext>
    
    </beans>
```    

This remove the need to compile/re-compile `HelloRoute` to define the Camel route to run.

# Building message based application using Camel

To present you with a more practical demo, I would show you further on how to setup Camel to process message based application. In many IT
shops, it's common that you would have a server to take message data as input and process them. A practical use case is to take any JSON
formated message and transform it into object and process it. To do this in Camel, what you want to build is a route that will take 
input messages from a TCP port, and then process it in a pipeflow with any business logic you may have. You will run the route as a server, 
and then client may use any mean to submit the message to the TCP port. Client may even be another thin Camel client app to submit data as well. 
Let me show you how to get started.

## Writing the server side code with Camel route

The server side would need a route to listen from a TCP port, and this is provided by `camel-mina` component. The first step is you need a route.

```
    package deng.cameldemo;
    
    import org.apache.camel.builder.RouteBuilder;
    
    public class TcpMsgRoute extends RouteBuilder {
        @Override
        public void configure() throws Exception {
            String port = System.getProperty("port", "12345");
            from("mina:tcp://localhost:" + port + "?sync=false").
                to("log:" + getClass().getName());
        }
    }
```    

Then the next step is ... done! No way, you mean that's all there to it for a server? Too good to be true? Well, let's try it out

```
    $ bin/run-java deng.cameldemo.CamelRunner deng.cameldemo.TcpMsgRoute -Dport=12345
    15:21:41 main INFO  org.apache.camel.impl.DefaultCamelContext:1391 | Apache Camel 2.10.1 (CamelContext: camel-1) is starting
    15:21:41 main INFO  org.apache.camel.management.ManagementStrategyFactory:43 | JMX enabled.
    15:21:42 main INFO  org.apache.camel.impl.converter.DefaultTypeConverter:45 | Loaded 172 type converters
    15:21:42 main INFO  org.apache.camel.component.mina.MinaConsumer:59 | Binding to server address: localhost/127.0.0.1:12345 using acceptor: org.apache.mina.transport.socket.nio.SocketAcceptor@2ffad8fe
    15:21:42 main INFO  org.apache.camel.impl.DefaultCamelContext:2045 | Route: route1 started and consuming from: Endpoint[mina://tcp://localhost:12345?sync=true]
    15:21:42 main INFO  org.apache.camel.management.DefaultManagementLifecycleStrategy:859 | StatisticsLevel at All so enabling load performance statistics
    15:21:42 main INFO  org.apache.camel.impl.DefaultCamelContext:1426 | Total 1 routes, of which 1 is started.
    15:21:42 main INFO  org.apache.camel.impl.DefaultCamelContext:1427 | Apache Camel 2.10.1 (CamelContext: camel-1) started in 0.505 seconds
    15:21:42 main INFO  deng.cameldemo.CamelRunner:93 | Camel started for CamelContext(camel-1)
```

Voila! The server is up and waiting for your users to send messages through port `12345`. Not too bad for few lines of code.

## Writing the client side code with Camel ProducerTemplate

Since our server expose a TCP port and take in any text content message, you can create any client that's capable writing to a TCP socket. In here, 
I will show you how to use Camel to write a thin client.

```
    package deng.cameldemo.client;
    
    import java.io.FileReader;
    import org.apache.camel.CamelContext;
    import org.apache.camel.ProducerTemplate;
    import org.apache.camel.impl.DefaultCamelContext;
    import org.apache.commons.io.IOUtils;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    
    public class TcpMsgSender {
        public static void main(String[] args) throws Exception {
            TcpMsgSender runner = new TcpMsgSender();
            runner.run(args);
        }
    
        private static Logger logger = LoggerFactory.getLogger(TcpMsgSender.class);
        public void run(String[] args) throws Exception {
            String fileName = args.length > 0 ? args[0] : "data/msg.txt";
            String[] hostPort = (args.length > 1 ? args[1] : "localhost:12345").split(":");
            String host = hostPort[0];
            String port = hostPort.length > 1 ? hostPort[1] : "12345";
            logger.info("Sending tcp message {} to host={}, port={}", new Object[]{ fileName, host, port});
    
            String text = IOUtils.toString(new FileReader(fileName));
            logger.debug("File size={}", text.length());
    
            CamelContext camelContext = new DefaultCamelContext();
            ProducerTemplate producer = camelContext.createProducerTemplate();
            producer.sendBody("mina:tcp://" + host + ":" + port + "?sync=false", text);
            logger.info("Message sent.");
        }
    }
```


This `TcpMsgSender` can send any text file to your server endpoint. Try this out while your server is running:

```
    $ bin/run-java deng.cameldemo.client.TcpMsgSender data/test-msg.json localhost:12345
    15:22:35 main INFO  deng.cameldemo.client.TcpMsgSender:24 | Sending tcp message data/test-msg.json to host=localhost, port=12345
    15:22:35 main DEBUG deng.cameldemo.client.TcpMsgSender:27 | File size=47
    15:22:35 main INFO  org.apache.camel.impl.converter.DefaultTypeConverter:45 | Loaded 172 type converters
    15:22:35 main INFO  org.apache.camel.management.ManagementStrategyFactory:43 | JMX enabled.
    15:22:35 main INFO  deng.cameldemo.client.TcpMsgSender:32 | Message sent.
```


You should able to verify from your server console output that it received the msg. The msg I sent is in `data/test-msg.json`, which 
contains this simple text:

    { "firstName" : "Zemian", "lastName" : "Deng" }
    
Note that our server simply receive plain text and log it. We will discuss how to process the message next.

## Processing message data in JSON format with Camel and Spring xml config

You thought the server code was easy from above, guess again. You can actually replace the `TcpMsgRoute` with just some simple xml lines!

```
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
            http://camel.apache.org/schema/spring http://camel.apache.org/schema/spring/camel-spring.xsd">
    
        <camelContext id="tcpMsgServer" xmlns="http://camel.apache.org/schema/spring">
            <route>
                <from uri="mina:tcp://localhost:12345?sync=false"/>
                <to uri="log://deng.cameldemo.TcpMsgServer"/>
            </route>
        </camelContext>
    
    </beans>
```    

Save it as `config/tcpmsgserver-spring.xml`. Then re-run the server, and you should get the same result as above.

    $ bin/run-java deng.cameldemo.CamelRunner -Dspring=true config/tcpmsgserver-spring.xml
    
Now let us improve the above xml to further process the JSON message data. We will like to transform the plain text to a Java object then process 
by a custom bean. To do that, we first would need to add unmarshal component to the route. This is where the `camel-jackson` comes into play. 
In our demo, the unmarshalling step would convert the JSON text into a `java.util.Map` and then pass it to a processor bean named `myMsgProcessor`.
Let's create a new xml file named `config/tcpmsgserver-json-spring.xml` as follow.

```
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
            http://camel.apache.org/schema/spring http://camel.apache.org/schema/spring/camel-spring.xsd">
    
        <camelContext id="tcpMsgServer" xmlns="http://camel.apache.org/schema/spring">
            <route>
                <from uri="mina:tcp://localhost:12345?sync=false"/>
                <to uri="log://deng.cameldemo.TcpMsgServer"/>
                <unmarshal>
                    <json library="Jackson"/>
                </unmarshal>
                <to uri="bean:myMsgProcessor?method=process"/>
            </route>
        </camelContext>
    
        <bean id="myMsgProcessor" class="deng.cameldemo.MyMsgProcessor">
        </bean>
    
    </beans>
```    

The `myMsgProcessor` is an Spring bean that we provide custom logic code to process the data. At this point we have a full Java object
to manipulate. The content of the processor can be any POJO with the method name specified in the URI. Here is an example one:

```
    package deng.cameldemo;
    
    import org.apache.camel.builder.RouteBuilder;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import java.util.Map;
    
    public class MyMsgProcessor {
        private static Logger logger = LoggerFactory.getLogger(MyMsgProcessor.class);
        public void process(Map<String, String> data) {
            logger.info("We should slice and dice the data: " + data);
        }
    }
```    

Try re-run the server with the new xml file above, and you should able to re-invoke the same client command to test it out. Here is a sample 
output of my server:

```
    $ bin/run-java deng.cameldemo.CamelRunner -Dspring=true config/tcpmsgserver-json-spring.xml
    17:05:25 main INFO  org.springframework.context.support.FileSystemXmlApplicationContext:456 | Refreshing org.springframework.context.support.FileSystemXmlApplicationContext@4200309: startup date [Sat Sep 15 17:05:25 EDT 2012]; root of context hierarchy
    17:05:25 main INFO  org.springframework.beans.factory.xml.XmlBeanDefinitionReader:315 | Loading XML bean definitions from file [/Users/zemian/projects/sandbox/camel-demo/config/tcpmsgserver-json-spring.xml]
    17:05:27 main INFO  org.springframework.beans.factory.support.DefaultListableBeanFactory:557 | Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@27b75165: defining beans [template,consumerTemplate,tcpMsgServer:beanPostProcessor,tcpMsgServer,myMsgProcessor]; root of factory hierarchy
    17:05:27 main INFO  org.apache.camel.spring.SpringCamelContext:1391 | Apache Camel 2.10.1 (CamelContext: tcpMsgServer) is starting
    17:05:27 main INFO  org.apache.camel.management.ManagementStrategyFactory:43 | JMX enabled.
    17:05:27 main INFO  org.apache.camel.impl.converter.DefaultTypeConverter:45 | Loaded 172 type converters
    17:05:28 main INFO  org.apache.camel.component.mina.MinaConsumer:59 | Binding to server address: localhost/127.0.0.1:12345 using acceptor: org.apache.mina.transport.socket.nio.SocketAcceptor@5a3cae4a
    17:05:28 main INFO  org.apache.camel.spring.SpringCamelContext:2045 | Route: route1 started and consuming from: Endpoint[mina://tcp://localhost:12345?sync=false]
    17:05:28 main INFO  org.apache.camel.management.DefaultManagementLifecycleStrategy:859 | StatisticsLevel at All so enabling load performance statistics
    17:05:28 main INFO  org.apache.camel.spring.SpringCamelContext:1426 | Total 1 routes, of which 1 is started.
    17:05:28 main INFO  org.apache.camel.spring.SpringCamelContext:1427 | Apache Camel 2.10.1 (CamelContext: tcpMsgServer) started in 0.695 seconds
    17:05:28 main INFO  deng.cameldemo.CamelRunner:61 | Spring started.
    17:05:35 Camel (tcpMsgServer) thread #3 - MinaThreadPool INFO  deng.cameldemo.TcpMsgServer:96 | Exchange[ExchangePattern:InOnly, BodyType:String, Body:{ "firstName" : "Zemian", "lastName" : "Deng" }]
    17:05:35 Camel (tcpMsgServer) thread #3 - MinaThreadPool INFO  deng.cameldemo.MyMsgProcessor:11 | We should slice and dice the data: {lastName=Deng, firstName=Zemian}
```    

Pay attention that Camel will auto convert the data format in your route! Our client only sends the plain text as JSON format, but when
server receives it, it unmarshals it using Jackson library, and then converts it into a java Map object. It then passes the map object into our
processor bean. Also, in this demo, I choose to use a generic `java.util.Map` as processor method argument (which is output of the JSON unmarshal), but
you can easily define your own business data type, such as `MyCustomerData`. This reveals the power of Camel, since you don't need to push the message
in your flow, but only worry about writing your "processor" as a POJO. The Camel will "glue" components together to form a route and carry the message data through the pipeline flow.

On the same token, when you write your business logic in one or more processors, it's a good idea that you limit your POJO logic to be as small 
unit as possible. When you do this, then you can maximize the reusability of the processors. The bigger POJO you make, with many business logics mixed in, it will also make it
difficult to test. So I recommend you when developing these processor beans, try to think them as LEGO pieces -- small POJO. You want to let Camel define the route and glue the LEGO
pieces togther. Once you get into this habit of thiking, then you can use Camel in a more effectively way to solve many of your domain problems.

Well, that's all for today folks. I hope you enjoyed the Camel ride. Happy programming!
