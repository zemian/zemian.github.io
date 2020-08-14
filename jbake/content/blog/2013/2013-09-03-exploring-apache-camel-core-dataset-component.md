---
title: Exploring Apache Camel Core - DataSet Component
date: 2013-09-03
tags:
  - camel
---

A good sample data generator can help you test program more throughly and help measure
the processing throughput. The `camel-core` comes with a `dataset` component that can
help you do this easily. All you need is to provide a bean that implements
`org.apache.camel.component.dataset.DataSet` interface and bind it in
CamelContext registry. Here is an example:

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.builder.*;
    import org.apache.camel.main.Main;
    import org.apache.camel.component.dataset.*;
    
    public class DataSetDemoCamel extends Main {
        static Logger LOG = LoggerFactory.getLogger(DataSetDemoCamel.class);
        public static void main(String[] args) throws Exception {
            DataSetDemoCamel main = new DataSetDemoCamel();
            main.enableHangupSupport();
            main.addRouteBuilder(createRouteBuilder());
            main.bind("sampleGenerator", createDataSet());
            main.run(args);
        }
        static RouteBuilder createRouteBuilder() {
            return new RouteBuilder() {
                public void configure() {
                    from("dataset://sampleGenerator")
                    .to("log://demo");
                }
            };
        }
        static DataSet createDataSet() {
            return new SimpleDataSet();
        }
    }

Compile and run it.

    mvn compile exec:java -Dexec.mainClass=camelcoredemo.DataSetDemoCamel

In here we have used the built-in `org.apache.camel.component.dataset.SimpleDataSet`
implementation, which by default will generate 10 messages with a text body set
to `<hello>world!</hello>`. You may easily change the value, or even provide your own
implementation starting with `org.apache.camel.component.dataset.DataSetSupport` base
class to customize your data set.

## Use DataSet Component to measure throughput

One useful feature of `dataset` component I found is using it to load test your `Route`.
To do this, you have to adjust couple settings though. Let&#8217;s say if I want to load
a large text file as sample input data and feed it to the `Route`, and then measure its
throughout.

        static RouteBuilder createRouteBuilder() {
            return new RouteBuilder() {
                public void configure() {
                    from("dataset://sampleGenerator?produceDelay=0")
                    .to("log://demo?groupSize=100");
                }
            };
        }
        static DataSet createDataSet() {
            SimpleDataSet result = new SimpleDataSet();
            result.setSize(500);
            result.setDefaultBody(readFileToString("my-large-sample.txt");
            return result;
        }

Replace above in the `Main` class and you will notice that it will pump 500 messages
into the `Route`, and it samples every 100 messages and display its throught rates. I
have to add `produceDelay=0` option so the generator so it will not pause between messages.
Then I have added `groupSize=100` option to `log` component for throughput measurement.
I skipped `readFileToString(String)` demo code since I assume you can easily figured that
out on your own. (Hint: checkout Apache `commons-io` library.)

There is another side of `dataset` component that you may use, and that is to receive and
verify message content. You would simply use the same URL in a
`to(url)` line. Internally Camel would assert your message body against your original.

There are more options availabe from [DataSet](http://camel.apache.org/dataset.html) component
that you may explore.
[Try it out with a Route](http://saltnlight5.blogspot.com/2013/08/getting-started-with-apache-camel-using.html)
and see it for yourself.