---
title: A simple way to setup Java application with external configuration file
date: 2012-10-27T00:00:00-05:00
tags:
  - java
---
Many Java applications would deploy and run it with some kind of external configuration files. It's very typical that you would want a set of config files per environments such as DEV, QA and PROD. There many options in tackling this problem, especially in a Java app, but keeping it simple and easy to maintain would take some disciplines.

Here I would layout a simple way you may use to depploy a typical Java application. The concept is simple and you can easily apply to a standalone, web, or even a JEE application.

## Use a env System Properties per environment

Java allows you to invoke any program with extra System Properties added. When launching an Java application, you should set an `env` property. For example:

    bash> java -Denv=prod myapp.Main
    

This property would give your `Main` application to identify which environment you are running against with. You should be reading it like this inside your code:

    String env = System.getProperty("env", "dev");
    

This way you always would have an environment to work with. Even if user doesn't supply one, it will default to use `dev` env.

Another useful System Property to set is `app.home`. You want to set this value in relative to where your application is deployed, so you may reference any files (eg: data) easily. To do this, you can use a script wrapper to automatically calculate the path. See section below for an example.

## Use a config dir prefix in CLASSPATH

In stead of passing a explicit config file to your application as argument, another flexible way to load configuration file is to add an extra `config`
folder into your CLASSPATH. For example, you can easily create a startup wrapper script `myapp.sh` like this:

    #/usr/bin/env bash
    APP_HOME=$(cd "`dirname $0`/.." && pwd)
    java $JAVA_OPTS -Dapp.home=$APP_HOME -cp "$APP_HOME/config:$APP_HOME/lib/*" myapp.Main "$@"
    

From this, you can setup the application packaging layout this way:

```
    myapp
        +- bin
            +- myapp.sh
        +- config
            +- dev.properties
            +- qa.properties
            +- prod.properties
        +- data
            +- myrecords.data
        +- lib
            +- myapp-1.0.0.jar
            +- slf4j-1.7.1.jar
```    

You would typically invoke the application like this:

    
    bash> JAVA_OPTS='-Denv=prod' myapp/bin/myapp.sh
    

The above will give you a good foundation to load a single config properties file per `env`. For example, you can read your properites file like this somewhere in your code.


```
    // Get appHome and data dir.
    String appHome = System.getProperty("app.home");
    String dataDir = appHome + "/data";
    
    // Get env value to load config parameters
    String env = System.getProperty("env", "dev");
    String config = env + ".properites";
    Properties configProps = new Properties();
    InputStream inStream = null;
    try {
        inStream = getClass().getClassLoader().getResourceAsStream(config);
        configProps.load(inStream);
    } finally {
        if (inStream != null)
            inStream.close();
    }
    // Now load any config parameters from configProps map.
```    

Now you would have the `configProps` object at your disposal to read any configuration keys and values set per an environment.

NOTE: If you want a more flexible Java wrapper script, see my old post on [run-java](https://zemian.github.io/2012/08/a-better-java-shell-script-wrapper.html) wrapper.

## Do not abuse CLASSPATH

Now, just because you have setup `config` as part of your CLASSPATH entry, I have to caution you not to abuse it. What I mean is do not go wild on 
loading all your application resources in that folder! If you have that many resources that user MUST edit and configure, then you should re-think
about your application design! Simple interface, or configuration in this case, is always a win. Do not bother users with complexity just because 
your application can support gazillion ways of configuration combination. If you can keep it as one config file, it would make users very happy.

Also, this doesn't mean you have to put the entire world inside one of `prod.properites` either. In the real world, an application is likely going to have only 
handful of user tunable parameters, and many other resources are less frequent used. I would recommand put the most frequently used parameters in these
config properties only. For all other (for example most of the Spring context files in an application do not belong to a typical users config level, they are more developer level config files. In another word, changing these files would have catastrophic effect to your application!) You should put these inside as part of your `myapp.jar`.

 

You might ask, 'Oh, but what happen if I must want to override one of 
the resource in the jar?'. But in that very unusual case, you would still have an option to override! You have the `config` as prefix in CLASSPATH, remember? Even when you nested resources inside a package inside the 
jar, you would still able to overwrite by simply create same directory structure inside `config`. You probably only do this for emmergency and less frequent use anyway.

## Feedback

So what are some clever ways you have seen or done with your application configuration? I hope to hear from you and share.
