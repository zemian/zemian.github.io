title=Exploring Apache Camel Core - Seda Component
date=2013-09-08
type=post
tags=camel
status=published
~~~~~~

The `seda` component in Apache Camel is very similar to the `direct` component that I&#8217;ve presented in previous blog, but in a asynchronous manner. To do this, it uses a `java.util.concurrent.BlockingQueue` as default implementation to queue up messages and disconnect from your main `Route` thread and then processing the messages in a separated thread. Because of this `BlockingQueue`, you need to be aware of the usage and config option.

One option needs to be aware of asynchronous processing is the it default to queue size is unbound, meaning it will grow as much as your memory allowed. To cap this, set `size=1000`. Let&#8217;s see an example.

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.builder.*;
    import org.apache.camel.main.Main;
    import java.io.*;
    
    public class SedaDemoCamel extends Main {
        static Logger LOG = LoggerFactory.getLogger(SedaDemoCamel.class);
        public static void main(String[] args) throws Exception {
            SedaDemoCamel main = new SedaDemoCamel();
            main.enableHangupSupport();
            main.addRouteBuilder(createRouteBuilder1());
            main.addRouteBuilder(createRouteBuilder2());
            main.addRouteBuilder(createRouteBuilder3());
            main.run(args);
        }
        // The file poller route
        static RouteBuilder createRouteBuilder1() {
            return new RouteBuilder() {
                public void configure() {
                    from("file://target/input?preMove=staging&move=.processed")
                    .process(new Processor() {
                        public void process(Exchange msg) {
                            CamelContext camelContext = msg.getContext();
                            ProducerTemplate producer = camelContext.createProducerTemplate();
                            String text = msg.getIn().getBody(String.class);
                            String fileName = (String)msg.getIn().getHeader("CamelFileName");
                            boolean specialFile = fileName.endsWith("_SPECIAL.dat");
                            if (specialFile)
                                producer.sendBody("seda:specialRoute", text);
                            else
                                producer.sendBody("seda:normalRoute", text);
                        }
                    });
                }
            };
        }
        // The special file processing route
        static RouteBuilder createRouteBuilder2() {
            return new RouteBuilder() {
                public void configure() {
                    from("seda:specialRoute")
                    .process(new Processor() {
                        public void process(Exchange msg) {
                            LOG.info("Processing special file: " + msg);
                        }
                    });
                }
            };
        }
        // The normal file processing route
        static RouteBuilder createRouteBuilder3() {
            return new RouteBuilder() {
                public void configure() {
                    from("seda:normalRoute")
                    .process(new Processor() {
                        public void process(Exchange msg) {
                            LOG.info("Processing normal file: " + msg);
                        }
                    });
                }
            };
        }
    }

You will notice that this demo code is very similar to the `direct` component demo, with few differences. First, we use `seda` endpoints. Second, in file poller, we read in the entire file content text. We do this because we are now passing to an asynchronous `Route` that will runs on separate threads. The poller is configured to move the processed file into different folder right after the first `Route` has ended. So we must ensure the processing `Route` is not depended on the path of the File, hence we will load entire text in instead.

Another interesting `seda` option is you may set the number of concurrent threads to receive the messages to process them! Let&#8217;s say if your **normal** files are heavy in traffic, then you can configure to use more threads on that part (default is just one thread.)

    from("seda:normalRoute?concurrentConsumers=10")
    .process(new Processor() {
        public void process(Exchange msg) {
            LOG.info("Processing normal file: " + msg);
        }
    });

To verify that your are running concurrently, you can easily configure your logger to display thread name. For
example with `log4j`, you can use this pattern:

    log4j.rootLogger=INFO, stdout
    log4j.appender.stdout=org.apache.log4j.ConsoleAppender
    log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
    log4j.appender.stdout.layout.ConversionPattern=%d %p %t [%c] - %m%n

There are more options availabe from [Seda](http://camel.apache.org/seda.html) component
that you may explore.
[Try it out with a Route](http://saltnlight5.blogspot.com/2013/08/getting-started-with-apache-camel-using.html)
and see it for yourself.