---
title: Exploring Apache Camel Core - Direct Component
date: 2013-09-07T00:00:00-05:00
tags:
  - camel
---

The Apache Camel allows you to create multiple `Route`'s within a single `CamelContext` space. The `direct` component in Camel would allow you to bridge messages between these `Route`'s. To demonstrate this, I will create few routes and pass messages between them.

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.builder.*;
    import org.apache.camel.main.Main;
    import java.io.*;
    
    public class DirectDemoCamel extends Main {
        static Logger LOG = LoggerFactory.getLogger(DirectDemoCamel.class);
        public static void main(String[] args) throws Exception {
            DirectDemoCamel main = new DirectDemoCamel();
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
                            File file = msg.getIn().getBody(File.class);
                            boolean specialFile = file.getName().endsWith("_SPECIAL.dat");
                            if (specialFile)
                                producer.send("direct:specialRoute", msg);
                            else
                                producer.send("direct:normalRoute", msg);
                        }
                    });
                }
            };
        }
        // The special file processing route
        static RouteBuilder createRouteBuilder2() {
            return new RouteBuilder() {
                public void configure() {
                    from("direct:specialRoute")
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
                    from("direct:normalRoute")
                    .process(new Processor() {
                        public void process(Exchange msg) {
                            LOG.info("Processing normal file: " + msg);
                        }
                    });
                }
            };
        }
    }

Here I have created 3 `Route`'s and re-used the `file` component I have introduced in the past. The first `Route` polls a directory, and then based on the name of the file found, we send it to either to **special** or **normal**`Route` for processing. Because these `Route`'s are separated, we need a bridge channel to pass the messages through, hence it's what the `direct` component does. The usage is simply use any **unique name** within the `CamelContext`, and it will serve as a direct memory queue to pass messages. You may read from or send to these queues. So as you can see, the `direct` component let you easily breakup a complex route workflow into smaller part.

In above demo, I have also introduced a bit of Camel core features: `ProducerTemplate`. Within a `CamelContext` you may create an instance of `ProducerTemplate` and it will allow you to send any messages to any endpoints dynamically at runtime. Usually you would probably want to store this producer object as member field instead of per each message processing. But for demo purpose, I will leave it as simple as that, and leave you as exercise to explore more on your own.

There are more options availabe from [Direct](http://camel.apache.org/direct.html) component
that you may explore.
[Try it out with a Route](https://zemian.github.io/2013/08/getting-started-with-apache-camel-using.html)
and see it for yourself.
