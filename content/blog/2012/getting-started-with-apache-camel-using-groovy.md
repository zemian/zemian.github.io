Title: Getting started with Apache Camel using Groovy
Date: 2012-08-18 00:00:00-05:00
Tags: groovy,camel



From their site, it says the [Apache Camel](http://camel.apache.org) is a versatile open-source integration framework based on known Enterprise Integration Patterns. It might seem like a vague definition, but I want to tell you that this is a very productive Java library that can solve many of typical IT problems! You can think of it as a very light weight ESB framework with "batteries" included.

In every jobs I've been to so far, folks are writing their own solutions in one way or another to solve many common problems (or they would buy some very expensive enterprisy ESB servers that takes months and months to learn, config, and maintain). Things that we commonly solve are integration (glue) code of existing business services together, process data in a certain workflow manner, or move and transform data from one place to another etc. These are very typical need in many IT environments. The Apache Camel can be used in cases like these; not only that, but also in a very productive and effective way!

In this article, I will show you how to get started with Apache Camel along with just few lines of [Groovy](http://groovy.codehaus.org/) script. You can certainly also start off with a full Java project to try out Camel, but I find Groovy will give you the shortest working example and learning curve. 

## Getting started with Apache Camel using Groovy

So let's begin. First let's see a hello world demo with Camel + Groovy.

```
    @Grab('org.apache.camel:camel-core:2.10.0')
    @Grab('org.slf4j:slf4j-simple:1.6.6')
    import org.apache.camel.*
    import org.apache.camel.impl.*
    import org.apache.camel.builder.*
    
    def camelContext = new DefaultCamelContext()
    camelContext.addRoutes(new RouteBuilder() {
        def void configure() {
            from("timer://jdkTimer?period=3000")
                .to("log://camelLogger?level=INFO")
        }
    })
    camelContext.start()
    
    addShutdownHook{ camelContext.stop() }
    synchronized(this){ this.wait() }
```

Save above into a file named `helloCamel.groovy` and then run it like this:

```
    $ groovy helloCamel.groovy
    388 [main] INFO org.apache.camel.impl.DefaultCamelContext - Apache Camel 2.10.0 (CamelContext: camel-1) is starting
    445 [main] INFO org.apache.camel.management.ManagementStrategyFactory - JMX enabled.
    447 [main] INFO org.apache.camel.management.DefaultManagementLifecycleStrategy - StatisticsLevel at All so enabling load performance statistics
    678 [main] INFO org.apache.camel.impl.converter.DefaultTypeConverter - Loaded 170 type converters
    882 [main] INFO org.apache.camel.impl.DefaultCamelContext - Route: route1 started and consuming from: Endpoint[timer://jdkTimer?period=3000]
    883 [main] INFO org.apache.camel.impl.DefaultCamelContext - Total 1 routes, of which 1 is started.
    887 [main] INFO org.apache.camel.impl.DefaultCamelContext - Apache Camel 2.10.0 (CamelContext: camel-1) started in 0.496 seconds
    898 [Camel (camel-1) thread #1 - timer://jdkTimer] INFO camelLogger - Exchange[ExchangePattern:InOnly, BodyType:null, Body:[Body is null]]
    3884 [Camel (camel-1) thread #1 - timer://jdkTimer] INFO camelLogger - Exchange[ExchangePattern:InOnly, BodyType:null, Body:[Body is null]]
    6884 [Camel (camel-1) thread #1 - timer://jdkTimer] INFO camelLogger - Exchange[ExchangePattern:InOnly, BodyType:null, Body:[Body is null]]
    ...
```    

The little script above is simple but it presented few key features of Camel Groovyness. The first and last section of the `helloCamel.groovy` script are just Groovy featuers. The `@Grab` annotation will automatically download the dependency jars you specify. We import Java packages to use its classes later. At the end we ensure to shutdown Camel before exiting JVM through the Java Shutdown Hook mechanism. The program will sit and wait until user press `CTRL+C`, just as a typical server process behavior.

The middle section is where the Camel action is. You would always create a Camel context to begin (think of it as the server or manager for the process.) And then you would add a Camel route (think of it as a workflow or pipeflow) that you like to process data (Camel likes to call these data "messages"). The route consists of a "from" starting point (where data generated), and one or more "to" points (where data going to be processed). Camel calls these destination 'points' as 'Endpoints'. These endpoints can be expressed in simple URI string format such as `"timer://jdkTimer?period=3000"`. Here we are generating timer message in every 3 secs into the pipeflow, and then process by a logger URI, which will simply print to console output.

After Camel context started, it will start processing data through the workflow, as you can observe from the output example above. Now try pressing `CTRL+C` to end its process. Notice how the Camel will shutdown everything very gracefully.

```
    7312 [Thread-2] INFO org.apache.camel.impl.DefaultCamelContext - Apache Camel 2.10.0 (CamelContext: camel-1) is shutting down
    7312 [Thread-2] INFO org.apache.camel.impl.DefaultShutdownStrategy - Starting to graceful shutdown 1 routes (timeout 300 seconds)
    7317 [Camel (camel-1) thread #2 - ShutdownTask] INFO org.apache.camel.impl.DefaultShutdownStrategy - Route: route1 shutdown complete, was consuming from: Endpoint[timer://jdkTimer?period=3000]
    7317 [Thread-2] INFO org.apache.camel.impl.DefaultShutdownStrategy - Graceful shutdown of 1 routes completed in 0 seconds
    7321 [Thread-2] INFO org.apache.camel.impl.converter.DefaultTypeConverter - TypeConverterRegistry utilization[attempts=2, hits=2, misses=0, failures=0] mappings[total=170, misses=0]
    7322 [Thread-2] INFO org.apache.camel.impl.DefaultCamelContext - Apache Camel 2.10.0 (CamelContext: camel-1) is shutdown in 0.010 seconds. Uptime 7.053 seconds.
```    

So that's our first taste of Camel ride! However, we titled this section as "Hello World!" demo, and yet we haven't seen any. But you might have also noticed that above script are mostly boiler plate code that we setup. No user logic has been added yet. Not even the logging the message part! We simply configuring the route.

Now let's modify the script little bit so we will actually add our user logic to process the timer message.

```
    @Grab('org.apache.camel:camel-core:2.10.0')
    @Grab('org.slf4j:slf4j-simple:1.6.6')
    import org.apache.camel.*
    import org.apache.camel.impl.*
    import org.apache.camel.builder.*
    
    def camelContext = new DefaultCamelContext()
    camelContext.addRoutes(new RouteBuilder() {
        def void configure() {
            from("timer://jdkTimer?period=3000")
                .to("log://camelLogger?level=INFO")
                .process(new Processor() {
                    def void process(Exchange exchange) {
                        println("Hello World!")
                    }
                })
        }
    })
    camelContext.start()
    
    addShutdownHook{ camelContext.stop() }
    synchronized(this){ this.wait() }
```    

Notice how I can simply append the process code part right after the `to("log...")` line. I have added a "processor" code block to process the timer message. The logic is simple: we greet the world on each tick.

## Making Camel route more concise and practical

Now, do I have you at Hello yet? If not, then I hope you will be patient and continue to follow along for few more practical features of Camel. First, if you were to put Camel in real use, I would recommend you setup your business logic separately from the workflow route definition. This is so that you can clearly express and see your entire pipeflow of route at a glance. To do this, you want to move the "processor", into a service bean.

```
    @Grab('org.apache.camel:camel-core:2.10.0')
    @Grab('org.slf4j:slf4j-simple:1.6.6')
    import org.apache.camel.*
    import org.apache.camel.impl.*
    import org.apache.camel.builder.*
    import org.apache.camel.util.jndi.*
    
    class SystemInfoService {
        def void run() {
            println("Hello World!")
        }
    }
    def jndiContext = new JndiContext();
    jndiContext.bind("systemInfoPoller", new SystemInfoService())
    
    def camelContext = new DefaultCamelContext(jndiContext)
    camelContext.addRoutes(new RouteBuilder() {
        def void configure() {
            from("timer://jdkTimer?period=3000")
                .to("log://camelLogger?level=INFO")
                .to("bean://systemInfoPoller?method=run")
        }
    })
    camelContext.start()
    
    addShutdownHook{ camelContext.stop() }
    synchronized(this){ this.wait() }
```    

Now, see how compact this workflow route has become? The Camel's Java DSL such as `"from().to().to()"` for defining route are so clean and simple to use. You can even show this code snip to your Business Analysts, and they would likely be able to verify your business flow easily! Wouldn't that alone worth a million dollars?

# How about another demo: FilePoller Processing

File polling processing is a very common and effective way to solve many business problems. If you work for commercial companies long enough, you might have written one before. A typical file poller would process incoming files from a directory and then process the content, and then move the file into a output directory. Let's make a Camel route to do just that.

```
    @Grab('org.apache.camel:camel-core:2.10.0')
    @Grab('org.slf4j:slf4j-simple:1.6.6')
    import org.apache.camel.*
    import org.apache.camel.impl.*
    import org.apache.camel.builder.*
    import org.apache.camel.util.jndi.*
    
    class UpperCaseTextService {
        def String transform(String text) {
            return text.toUpperCase()
        }
    }
    def jndiContext = new JndiContext();
    jndiContext.bind("upperCaseTextService", new UpperCaseTextService())
    
    def dataDir = "/${System.properties['user.home']}/test/file-poller-demo"
    def camelContext = new DefaultCamelContext(jndiContext)
    camelContext.addRoutes(new RouteBuilder() {
        def void configure() {
            from("file://${dataDir}/in")
                .to("log://camelLogger")
                .to("bean://upperCaseTextService?method=transform")
                .to("file://${dataDir}/out")
        }
    })
    camelContext.start()
    
    addShutdownHook{ camelContext.stop() }
    synchronized(this){ this.wait() }    
```

Here you see I defined a route to poll a `$HOME/test/file-poller-demo/in` directory for text files. Once it's found it will log it to console, and then process by a service that transform the content text into upper case. After this, it will send the file into `$HOME/test/file-poller-demo/out` directory. My goodness, reading the Camel route above probably express what I wrote down just as effective. Do you see the benefits here?

## What's the "batteries" included part.

If you've used Python programming before, you might have heard the pharase that they claim often: Python has "batteries" included. This means their interpreter comes with a rich of libaries for most of the common programming need. You can often write python program without have to download separated external libraries.

I am making similar analogies here with Apache Camel. The Camel project comes with so many ready to use [components](http://camel.apache.org/components.html) that you can find just about any transport protocals that can carry data. These Camel "components" are ones that support different 'Endpoint URI' that we have seen in our demos above. We have simply shown you `timer`, `log`, `bean`, and `file` components, but there are over 120 more. You will find `jms`, `http`, `ftp`, `cfx`, or `tcp`  just to name a few.

The Camel project also has an option for you to define route in [declarative xml format](http://camel.apache.org/spring.html). The xml is just an extension of a Spring xml config with Camel's namespace handler added on top. Spring is optional in Camel, but you can use it together in a very powerful way.

