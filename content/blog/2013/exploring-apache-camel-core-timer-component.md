---
title: Exploring Apache Camel Core - Timer Component
date: 2013-09-01T00:00:00-05:00
tags:
  - camel
---

Camel Timer is a simple and yet useful component.
It brings the JDK&#8217;s timer functionality into your camel Route with very simple config.

       from("timer://mytimer?period=1000")
        .process(new Processor() {
            public void process(Exchange msg) {
                LOG.info("Processing {}", msg);
            }
        });

That will generate a timer event message every second. You may short hand `1000` with
`1s` instead. It supports `m` for minutes, or `h` for hours as well. Pretty handy.

Another useful timer feature is that it can limit (stop) the number of timer messages after a certain
count. You simply need to add `repeatCount` option toward the url.

Couple of properties from the event message would be useful when handling the timer
message. Here is an example how to read them.

       from("timer://mytimer?period=1s&repeatCount=5")
        .process(new Processor() {
            public void process(Exchange msg) {
                java.util.Date fireTime = msg.getProperty(Exchange.TIMER_FIRED_TIME, java.util.Date.class);
                int eventCount = msg.getProperty(Exchange.TIMER_COUNTER, Integer.class);
                LOG.info("We received {}th timer event that was fired on {}", eventCount, fireTime);
            }
        });

There are more options availabe from [Timer](http://camel.apache.org/timer.html) component
that you may explore.
[Try it out with a Route](https://zemian.github.io/2013/08/getting-started-with-apache-camel-using.html)
and see it for yourself.
