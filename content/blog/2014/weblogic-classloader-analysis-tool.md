Title: WebLogic Classloader Analysis Tool
Date: 2014-03-03 00:00:00-05:00
Tags: weblogic


The WebLogic Server has a built-in webapp called Classloader Analysis Tool, and you may access it through http://localhost:7001/wls-cat

You need to login with same user as you configured for the /console webapp. With the CAT, you may check what classes are loaded by your application in the server. This is extremely handy if your app is loading jar that's already loaded by the server. For example, if you include your own Apache commons-lang.jar in a webapp and deploy it, you will see that org.apache.commons.lang.time.DateUtils is not from your webapp!

![](/images/posts/2014/wls-analysis-tool.png)

If you ever get an error saying DateUtils#addDay() doesn't exist or signature not match, then likely you are using different version than the one comes with WLS. In this case, you will need to add "WEB-INF/weblogic.xml" that change classloading behavior. Like this:
```
<weblogic-web-app>
    <container-descriptor>
    <prefer-web-inf-classes>true</prefer-web-inf-classes>
    </container-descriptor>
</weblogic-web-app>
```

Another cool thing you can use this webapp to check is resources packaged inside any jars.  For resource file, you must use # prefix to it. For example try look up #log4j.properties and you will see where it's loading from.

You may read more about this tool and related material here: [http://docs.oracle.com/cd/E24329_01/web.1211/e24368/classloading.htm](http://docs.oracle.com/cd/E24329_01/web.1211/e24368/classloading.htm)

