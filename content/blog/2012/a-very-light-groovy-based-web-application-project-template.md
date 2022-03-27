Title: A very light Groovy based web application project template
Date: 2012-11-28 00:00:00-05:00
Tags: groovy



You might have heard of the project Grails is a Groovy version of Ruby on Rails like framework that let you create web application much more easier with
Dynamic scripting. Despite all that power Grails provided, it is not "light" if you look under the hood. I am not saying Grails is bad or anything. Grails is actually pretty cool to write web application with. However I found myself often want something even lighter and yet still want to prototype with Groovy. So here I will show you a [maven-groovy-webapp](https://bitbucket.org/saltnlight5/sandbox/downloads/maven-webapp-groovy.zip) project template that I use to get start any web application development. It's very simple, light, and yet very Groovy.

# How to get started

Unzip `maven-webapp-groovy.zip` above and you should see these few files:

```
    bash> cd maven-webapp-groovy
    bash> find .
    bash> ./pom.xml
    bash> ./README.txt
    bash> ./src
    bash> ./src/main
    bash> ./src/main/java
    bash> ./src/main/java/deng
    bash> ./src/main/java/deng/GroovyContextListener.java
    bash> ./src/main/resources
    bash> ./src/main/resources/log4j.properties
    bash> ./src/main/webapp
    bash> ./src/main/webapp/console.gt
    bash> ./src/main/webapp/health.gt
    bash> ./src/main/webapp/home.gt
    bash> ./src/main/webapp/WEB-INF
    bash> ./src/main/webapp/WEB-INF/classes
    bash> ./src/main/webapp/WEB-INF/classes/.keep
    bash> ./src/main/webapp/WEB-INF/groovy
    bash> ./src/main/webapp/WEB-INF/groovy/console.groovy
    bash> ./src/main/webapp/WEB-INF/groovy/health.groovy
    bash> ./src/main/webapp/WEB-INF/groovy/home.groovy
    bash> ./src/main/webapp/WEB-INF/groovy/init.groovy
    bash> ./src/main/webapp/WEB-INF/groovy/destroy.groovy
    bash> ./src/main/webapp/WEB-INF/web.xml
```    

As you can see it's a maven based application, and I have configured tomcat plugin, so you may run it like this:

    bash> mvn tomcat7:run
    bash> open http://localhost:8080/maven-webapp-groovy/home.groovy
    

And ofcourse, with maven, running package phase will let you deploy it into any real application servers when ready.

    bash> mvn package
    bash> cp target/maven-webapp-groovy.war $APP_SERVER_HOME/autodeploy
    

# What's in it

You should checkout the main config in `web.xml` file, and you'll see that there couple built-in Groovy servlets and a custom listener.

```
    <?xml version="1.0"?>
    <web-app xmlns="http://java.sun.com/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
            version="2.5">
    
        <description>Groovy Web Application</description>
        <welcome-file-list>
            <welcome-file>home.groovy</welcome-file>
        </welcome-file-list>
    
        <servlet>
            <servlet-name>GroovyServlet</servlet-name>
            <servlet-class>groovy.servlet.GroovyServlet</servlet-class>
        </servlet>
        <servlet-mapping>
            <servlet-name>GroovyServlet</servlet-name>
            <url-pattern>*.groovy</url-pattern>
        </servlet-mapping>
    
        <servlet>
            <servlet-name>TemplateServlet</servlet-name>
            <servlet-class>groovy.servlet.TemplateServlet</servlet-class>
        </servlet>
        <servlet-mapping>
            <servlet-name>TemplateServlet</servlet-name>
            <url-pattern>*.gt</url-pattern>
        </servlet-mapping>
    
        <listener>
            <listener-class>deng.GroovyContextListener</listener-class>
        </listener>
        <context-param>  
           <param-name>initScripts</param-name>
           <param-value>/WEB-INF/groovy/init.groovy</param-value>
        </context-param>
        <context-param>    
           <param-name>destroyScripts</param-name>
           <param-value>/WEB-INF/groovy/destroy.groovy</param-value>
        </context-param>
    
    </web-app>
```    

I've chosen to use `GroovyServlet` as a controller (it comes with Groovy!), and this let you use any scripts inside `/WEB-INF/groovy` directory. That's it, no further setup. That's about the only requirement you need to get a Groovy webapp started! See `console.groovy` as example and how it works. It's a groovy version of [this JVM console](https://zemian.github.io/2012/07/script-console-tool-for-any-war.html)

Now you can use Groovy to process any logic and even generate the HTML output if you like, but I find it even more easier to use `TemplateServlet`. This allow Groovy template files to be serve as view. It's very much like JSP, but it uses Groovy instead! And we know Groovy syntax are much shorter to write! See `console.gt` as exmaple and how it works.

The `GroovyContextListener` is something I wrote, and it's optional. This allow you to run any scripts during the webapp startup or shutdown states. I've created an empty `init.groovy` and `destroy.groovy` placeholder. So now you have all the hooks you need to prototype just about any web application you need.

# Simplicity wins

This setup is just plain Java Servlet with Groovy loaded. I often think the more simple you get, then less bug and faster you code. No heavy frameworks, no extra learning curve, (other than basic Servlet API and Groovy/Java skills ofcourse), and off you go.

Go have fun with this Groovy webapp template! And let me know if you have some cool prototypes to show off after playing with this. :)

