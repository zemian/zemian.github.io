---
title: Improving java.util.Properties
date: 2012-09-07T00:00:00-05:00
tags:
  - java
---

The Java built-in `java.util.Properties` class could really use some love. I have written a slightly improved version called
[timemachine.scheduler.support.Props](https://bitbucket.org/timemachine/scheduler/src/15f066cc6dad/timemachine-scheduler/src/main/java/timemachine/scheduler/support/Props.java), and below are some features that I use often.

# You can use it as a "String Map" of properties

```
    Props props1 = new Props();
    props1.put("foo", "bar");
    
    // It can load from/to the Java Properties
    Props props2 = new Props(System.getProperties());
    java.util.Properties javaProps = props3.toProperties();
    
    // It can load from/to a basic java.util.Map
    Props props3 = new Props(System.getenv());
    
    // Props is a HashMap<String, String>, so no need to convert. Just use it
    for(Map.Entry<String, String> entry : props3.entrySet())
        System.our.println(entry.getKey() + ": " + entry.getValue());
```    

# You can load from a file in a single line

```
    Props props1 = new Props("config.properties");
    Props props2 = new Props("/path/to/config.properties");
    Props props3 = new Props(new java.net.URL("http://myhost/config/config.properties"));
    Props props4 = new Props(ClasspathURLStreamHandler.createURL("classpath://config/config.properties"));
    
    // You can re-load on top of existing instance to override values
    props4.load("config2.properties");
```    

NOTE: The `ClasspathURLStreamHandler` is a utility class from the same package under `timemachine.scheduler.support` that can load any resources that's in the classpath.


# You can get many basic types conversion

```
    Props props = new Props();
    props.put("str", "foo");
    props.put("num", "123");
    props.put("dec", "99.99");
    props.put("flag", "true");
    
    String str = props.getString("str");
    int num = props.getInt("num");
    double dec = props.getDouble("dec");
    boolean flag = props.getBoolean("flag");
    
    // You can even get default value when key is not found too
    int num2 = props.getInt("num2", -1);
```    

# You can auto expand ${variable} from any existing properties

```
    Props props = new Props(System.getProperties());
    props.put("configDir", "${user.home}/myapp/config");
    props.expandVariables();
    
    // The ${user.home} should be expanded to actual user home dir value.
    File dir = new File(props.get("configDir"));
```    

There you have it. You see more code than words in this post, but I believe simple code speak louder than words and docs. I find these features very convenient and practical 
for many Java applications to use. I wish the JDK would provide these out of the box, and make the `java.util.Properties` more
developer friendly.
