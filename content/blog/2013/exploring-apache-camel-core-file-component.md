Title: Exploring Apache Camel Core - File Component
Date: 2013-09-04 00:00:00-05:00
Tags: camel



A file poller is a very useful mechanism to solve common IT problems. Camel&#8217;s built-in `file` component is extremely flexible, and there are many options available for configuration. Let&#8217;s cover few common usages here.

## Polling a directory for input files

Here is a typical Camel `Route` used to poll a directory for input files on every second.

    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.builder.*;
    import java.io.*;
    
    public class FileRouteBuilder extends RouteBuilder {
        static Logger LOG = LoggerFactory.getLogger(FileRouteBuilder.class);
        public void configure() {
            from("file://target/input?delay=1000")
            .process(new Processor() {
                public void process(Exchange msg) {
                    File file = msg.getIn().getBody(File.class);
                    LOG.info("Processing file: " + file);
                }
            });
        }
    }

Run this with following

    mvn compile exec:java -Dexec.mainClass=org.apache.camel.main.Main -Dexec.args='-r camelcoredemo.FileRouteBuilder'

The program will begin to poll your `target/input` folder under your current directory, and wait for incoming files. To test with input files, you would need to open another terminal, and then create some files as follow.

    echo 'Hello 1' > target/input/test1.txt
    echo 'Hello 2' > target/input/test2.txt

You should now see the first prompt window start to picking up the files and pass to the next `Processor` step. In the `Processor`, we obtain the `File` object from the message body. It then simply logs it&#8217;s file name. You may hit `CTRL+C` when you are done.

There many configurable options from `file` componet you may use in the URL, but most of the default settings are enough to get you going as simple case above. Some of these default behavior is such that if the input folder doesn&#8217;t exists, it will create it. And when the file is done processing by the `Route`, it will be moved into a `.camel` folder. If you don&#8217;t want the file at all after processing, then set `delete=true` in the URL.

## Read in the file content and converting to different types

By default, the `file` component will create a `org.apache.camel.component.file.GenericFile` object for each file found and pass it down your `Route` as message body. You may retrieve all your file information through this object. Or alternatively, you may also use the `Exchange` API to auto convert the message body object to a type you expect to receive (eg: as with `msg.getIn().getBody(File.class)`). In above example, the `File` is a type you expect to get from the message body, and Camel hence will try to convert it for you. The Camel uses the context&#8217;s registry space to pre-registered many `TypeConverter`'s that can handle most of the common data types (like Java primative etc) conversion. These `TypeConverter`*s* are powerful way to make your `Route` and `Processor` more flexbile and portable.

Camel will not only convert just your `File` object from message body, but it can also read the file content. If your files are character text based, then you can simply do this.

            from("file://target/input?charset=UTF-8")
            .process(new Processor() {
                public void process(Exchange msg) {
                    String text = msg.getIn().getBody(String.class);
                    LOG.info("Processing text: " + text);
                }
            });

That&#8217;s it! Simply specify `String` type, and Camel will read your file in and pass the entire file text content as body message. You may even use the `charset` to change the encoding.

If you are dealing with binary file, then simply try `byte[] bytes = msg.getIn().getBody(byte[].class);` conversion instead. Pretty cool huh?

## Polling and processing large files

When working with large files, there few options in `file` componet that you might want to use to ensure proper handling. For example, you might want to move the input file into a `staging` folder before the `Route` starts the processing; and when it&#8217;s done, move it to a `.completed` folder.

            from("file://target/input?preMove=staging&move=.completed")
            .process(new Processor() {
                public void process(Exchange msg) {
                    File file = msg.getIn().getBody(File.class);
                    LOG.info("Processing file: " + file);
                }
            });

To feed input files properly into the polling folder, it&#8217;s best if the sender generates the input files in a temporary folder first, and only when it&#8217;s ready then move it into the polling folder. This will minimize reading an incomplete file by the `Route` if the input file might take times to generate. Also another solution to this is to config `file` endpoint to only read the polling folder when there is a signal or ready marker file exists. For example:

            from("file://target/input?preMove=staging&move=.completed&doneFileName=ReadyFile.txt")
            .process(new Processor() {
                public void process(Exchange msg) {
                    File file = msg.getIn().getBody(File.class);
                    LOG.info("Processing file: " + file);
                }
            });

Above will only read the `target/input` folder when there is a `ReadyFile.txt` file exists. The marker file can be just an empty file, and it will be removed by Camel after polling. This solution would allow the sender to generate input files in however long time it might take.

Another concern with large file processing is to avoid loading entire file content into memory for processing. To be more practical, you want to split the file into records (eg: per line) and process it one by one (or called "streaming"). Here is how you would do that using Camel.

            from("file://target/input?preMove=staging&move=.completed")
            .split(body().tokenize("\n"))
            .streaming()
            .process(new Processor() {
                public void process(Exchange msg) {
                    String line = msg.getIn().getBody(String.class);
                    LOG.info("Processing line: " + line);
                }
            });

This `Route` will allow you to process large size file without cosuming too much memory and process it line by line very efficiently.

## Writing messages back into file

The `file` component can also be used to write messages into files. Recall that we may use `dataset` component to generate sample messages. We will use that to feed the `Route` and send to the `file` component so you can see that each message generated will be saved into a file.

    package camelcoredemo;
    
    import org.slf4j.*;
    import org.apache.camel.*;
    import org.apache.camel.builder.*;
    import org.apache.camel.main.Main;
    import org.apache.camel.component.dataset.*;
    
    public class FileDemoCamel extends Main {
        static Logger LOG = LoggerFactory.getLogger(FileDemoCamel.class);
        public static void main(String[] args) throws Exception {
            FileDemoCamel main = new FileDemoCamel();
            main.enableHangupSupport();
            main.addRouteBuilder(createRouteBuilder());
            main.bind("sampleGenerator", createDataSet());
            main.run(args);
        }
        static RouteBuilder createRouteBuilder() {
            return new RouteBuilder() {
                public void configure() {
                    from("dataset://sampleGenerator")
                    .to("file://target/output");
                }
            };
        }
        static DataSet createDataSet() {
            return new SimpleDataSet();
        }
    }

Compile and run it

    mvn compile exec:java -Dexec.mainClass=camelcoredemo.FileDemoCamel

Upon complete you will see that 10 files would be generated in `target/output` folder with
file name in `ID-<hostname>-<unique-number>-<msg-seq-num>` format.

There are more options availabe from [File](http://camel.apache.org/file2.html) component
that you may explore.
[Try it out with a Route](https://zemian.github.io/2013/08/getting-started-with-apache-camel-using.html)
and see it for yourself.

