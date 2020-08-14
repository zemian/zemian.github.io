---
title: Quick way to benchmark Java code
date: 2012-07-11
tags:
  - java
---
Don't you envy Ruby has the Benchmark module? Yes, there are many art and science go behind how to setup and run a good micro benchmark code, especially with the JVM. But many times you just want to see some result, quickly. There is actually a very groovy and quick way to bench mark Java code with gbench! Check this out:

     

    @Grab('com.googlecode.gbench:gbench:0.3.1-groovy-2.0')
    @Grab('commons-lang:commons-lang:2.6')
    import gbench.*
    import org.apache.commons.lang.StringUtils
    new BenchmarkBuilder().run {
        'jdk.String.split' {
            100.times{ "a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" ") }
        }
        'commons-lang.StringUtils.split' {
            100.times{ StringUtils.split("a b c d e f g h i j k l m n o p q r s t u v w x y z", " ") }
        }
    }.prettyPrint()

I ran above and get the following on my machine:

$ groovy benchmarkSplit.groovy
Environment
===========
* Groovy: 2.0.0
* JVM: Java HotSpot(TM) Client VM (20.1-b02, Sun Microsystems Inc.)
    * JRE: 1.6.0_26
    * Total Memory: 15.5 MB
    * Maximum Memory: 247.5 MB
* OS: Windows XP (5.1, x86)

Options
=======
* Warm Up: Auto
* CPU Time Measurement: On

                                  user  system     cpu    real

jdk.String.split                663219       0  663219  693382
commons-lang.StringUtils.split  192721       0  192721  212359