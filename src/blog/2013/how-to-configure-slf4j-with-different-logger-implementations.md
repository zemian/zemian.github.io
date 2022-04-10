---
title: How to configure SLF4J with different logger implementations
date: 2013-08-18T00:00:00-05:00
tags:
  - slf4j
  - logging
---

There are many good benefits in using `slf4j` library as your Java
application logging API layer. Here I will show few examples on how
to use and configure it with different loggers.

You can think of `slf4j` as an Java interface, and then you would
need an implementation (ONLY ONE) at runtime to provide the actual
logging details, such as writing to STDOUT or to a file etc. Each
logging implementation (or called binding) would obviously have their
own way of configuring the log output, but your application will remain
agnostic and always use the same `org.slf4j.Logger` API. Lets see how
this works in practice.

## 
Using `slf4j` with Simple logger

Create a Maven based project and this in your `pom.xml`.

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.5</version>
        </dependency>

Now you may use `Logger` in your Java code like this.

    package deng;
    import org.slf4j.*;
    public class Hello {
        static Logger LOGGER = LoggerFactory.getLogger(Hello.class);
        public static void main(String[] args) {
            for (int i = 0; i < 10; i++)
                if (i % 2 == 0)
                    LOGGER.info("Hello {}", i);
                else
                    LOGGER.debug("I am on index {}", i);
        }
    }

The above will get your program compiled, but when you run it, you will see these output.

    bash> java deng.Hello
    SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
    SLF4J: Defaulting to no-operation (NOP) logger implementation
    SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.

What its saying is that at runtime, you are missing the logging "implementation" (or the
logger binding), so `slf4j` simply use a "NOP" implmentation, which does nothing. In order
to see the output properly, you may try use an simple implementation that does not require
any configuration at all! Just go back to your `pom.xml` and add the following:

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.5</version>
        </dependency>

Now you see logging output on STDOUT with INFO level. This simple logger will default
show any INFO level message or higher. In order to see DEBUG messages, you would
need to pass in this System Property `-Dorg.slf4j.simpleLogger.defaultLogLevel=DEBUG`
at your Java startup.

## 
Using `slf4j` with Log4j logger

Now we can experiment and swap different logger implementations, but your application code
can remain the same. All we need is to replace `slf4j-simple` with another popular logger
implementation, such as the Log4j.

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.5</version>
        </dependency>

Again, we must configure logging per implementation that we picked.
In this case, we need an `src/main/resources/log4j.properties` file.

        log4j.rootLogger=DEBUG, STDOUT
        log4j.logger.deng=INFO
        log4j.appender.STDOUT=org.apache.log4j.ConsoleAppender
        log4j.appender.STDOUT.layout=org.apache.log4j.PatternLayout
        log4j.appender.STDOUT.layout.ConversionPattern=%5p [%t] (%F:%L) - %m%n

Re-run your program, and you should see similar output.

## 
Using `slf4j` with JDK logger

The JDK actually comes with a logger package, and you can replace `pom.xml`
with this logger implementation.

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-jdk14</artifactId>
            <version>1.7.5</version>
        </dependency>

Now the configuration for JDK logging is a bit difficult to work with. Not only need a
config file, such as `src/main/resources/logging.properties`, but you would also need
to add a System properties `-Djava.util.logging.config.file=logging.properties`
in order to have it pick it up. Here is an example to get you started:

    .level=INFO

    handlers=java.util.logging.ConsoleHandler
    java.util.logging.ConsoleHandler.level=FINEST
    deng.level=FINEST

## 
Using `slf4j` with Logback logger

The logback logger implementation is a super dupa quality implementation. If you intend
to write serious code that go into production, you may want to evaluate this option. Again
modify your `pom.xml` to replace with this:

        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.0.13</version>
        </dependency>

Here is a sample of configuration `src/main/resources/logback.xml` to get things started.

    <configuration>
      <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
          <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
      </appender>
    
      <logger name="deng" level="DEBUG"/>
    
      <root level="INFO">
        <appender-ref ref="STDOUT" />
      </root>
    </configuration>

## 
Writing your own library with `slf4j` logger

If you are providing an Java library for large end users consumption, its good idea to
set your project to depend on `slf4j-api` only, and then let your user choose any
logger implementation at their development or runtime environment. As end users, they
may quickly select one of option above and take advatage of their own favorite logging
implementation features.

## 
References

- [http://slf4j.org/](http://slf4j.org/)

- [http://logging.apache.org/log4j/1.2/](http://logging.apache.org/log4j/1.2/)

- [http://docs.oracle.com/javase/7/docs/technotes/guides/logging/](http://docs.oracle.com/javase/7/docs/technotes/guides/logging/)

- [http://logback.qos.ch/](http://logback.qos.ch/)
