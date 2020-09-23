title=Exploring Apache Camel Core - Log Component
date=2013-09-02
type=post
tags=camel
status=published
~~~~~~

There are many ways to log and inspect the messages as it pass through your
Camel `Route`. The `camel-core` comes with a `log` component that let
you inspect the message. So instead of write a separate
`Processor` just to log a line as got processed, try using this:

    from("timer://timer1?period=1s")
    .to("log:demo")

By default, the `log` component will record your message body content
through your logger name, `demo` in above case, at INFO level. Since you can give any
name, you can control the logging LEVEL anyway you like through a Camel
[SLF4J logger implementation](http://saltnlight5.blogspot.com/2013/08/how-to-configure-slf4j-with-different.html).

To log the message in DEBUG level, try this

    from("timer://timer1?period=1s")
    .to("log:demo?level=DEBUG")

Now if you use `log4j` as logger implementation, then ensure to add a
logger config like this.

    log4j.logger.demo = DEBUG
    log4j.logger.org.apache.camel = INFO

The Camel message may have Properties and Headers as well, so to display
these, you may add `showAll=true`.

When you process messages that have large body text, it might be more
practical to just dislay certain number of characters. To do this, add
`maxChars=256` to URL.

## How to measure Camel messages throughput rate

One of the hidden gem of the `log` componet is its ability to log messages
throughput! You may specific group of messages to be logged, and once it
reached that count, it will print the msgs/sec rate output. To enable
this, just add `groupSize` option to URL.

To demo this, I will create a `SampleGenerator` bean processor
that would flood the `Route` with sample messages. I will use the Camel
context registry to bind the bean, and then reference it in the `Route`. Here
is the demo code.

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.builder.*;
    import org.apache.camel.main.Main;
    
    public class LogDemoCamel extends Main {
        static Logger LOG = LoggerFactory.getLogger(LogDemoCamel.class);
        public static void main(String[] args) throws Exception {
            LogDemoCamel main = new LogDemoCamel();
            main.enableHangupSupport();
            main.addRouteBuilder(createRouteBuilder());
            main.bind("sampleGenerator", new SampleGenerator());
            main.run(args);
        }
        static RouteBuilder createRouteBuilder() {
            return new RouteBuilder() {
                public void configure() {
                    from("bean:sampleGenerator")
                    .to("log://demo?groupSize=100");
                }
            };
        }
        static class SampleGenerator implements Processor{
            int count = 0;
            public void process(Exchange msg) throws Exception {
                if (count >= 500){
                    LOG.info("Max count has reached. Do nothing.");
                    Thread.sleep(Long.MAX_VALUE);
                    return;
                }
    
                // Let's generate sample message.
                count++;
                LOG.trace("Generating sample msg #{}", count);
                msg.getOut().setBody("Sample msg");
            }
        }
    }

Now you should able to compile and run this demo.

    mvn compile exec:java -Dexec.mainClass=camelcoredemo.LogDemoCamel

When running this demo, you will notice the rate will be displayed on console
and how fast you can pump message to `Route` and to process it. This is a
very useful feature to help you measure and have a quick view on your `Route`'s
capability.

There are more options availabe from [Log](http://camel.apache.org/log.html) component
that you may explore.
[Try it out with a Route](http://saltnlight5.blogspot.com/2013/08/getting-started-with-apache-camel-using.html)
and see it for yourself.