---
title: Getting started with annotation based Spring MVC web application
date: 2013-10-04T00:00:00-05:00
tags:
  - spring
---

Here is a minimal way to get a Spring 3 MVC project started with Maven.

First create `spring-web-annotation/pom.xml` file and include the Spring dependency:

    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://maven.apache.org/POM/4.0.0
            http://maven.apache.org/maven-v4_0_0.xsd">
    
        <modelVersion>4.0.0</modelVersion>
        <groupId>spring-web-annotation</groupId>
        <artifactId>spring-web-annotation</artifactId>
        <version>1.0-SNAPSHOT</version>
        <packaging>war</packaging>
    
        <dependencies>
            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>javax.servlet-api</artifactId>
                <version>3.1.0</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-webmvc</artifactId>
                <version>3.2.4.RELEASE</version>
            </dependency>
        </dependencies>
    </project>

Now create the Servlet 3 web initializer and the Spring annotation config for the MVC parts in `spring-web-annotation/src/main/java/springweb/WebApp.java`

    package springweb;
    
    import org.springframework.context.annotation.ComponentScan;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.EnableWebMvc;
    import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
    
    public class WebApp extends AbstractAnnotationConfigDispatcherServletInitializer {
        @Override
        protected Class<?>[] getRootConfigClasses() {
            return new Class<?>[0];
        }
    
        @Override
        protected Class<?>[] getServletConfigClasses() {
            return new Class<?>[]{ WebAppConfig.class };
        }
    
        @Override
        protected String[] getServletMappings() {
            return new String[]{ "/" };
        }
    
        @Configuration
        @EnableWebMvc
        @ComponentScan("springweb.controller")
        public static class WebAppConfig {
        }
    }

The `WebApp` class extends Spring's built in Servlet3 web initializer code. It allows Servlet3 container such as Tomcat7 to auto detect this web application without the need of `web.xml` configuration setup. Because of we do not use `web.xml`, we need this class to allow Spring to hook into the Servlet container to bootstrap their dispatcher servlet. Also instead of typical Spring beans xml file configuration, we now can use all annotation based using `WebAppConfig`.

Noticed that I have combined the `WebAppConfig` as inner class, but you can easily move it out as top level class in a full scale application. This is the Spring annotation version of container configuration. You can easily customize the application by adding new `@Bean` here.

Note: Do not forget to overwrite `getServletMappings` method with `"/"`, or else your URL request will not direct to the Spring dispatcher for processing! A step that can easily forgotten and you might find your self chasing why Spring controllers are not working.

Above are really the minmal setup you need to start a war project. Next you want to add at least one controller to have some output to verify. Create this controller file `spring-web-annotation/src/main/java/springweb/controller/IndexController.java`

    package springweb.controller;
    
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.RequestMapping;
    
    @Controller
    public class IndexController {
        @RequestMapping(value="/")
        public String index() {
            return "index";
        }
    }

And now you would need the JSP view `spring-web-annotation/src/main/webapp/index.jsp`

    Hello World.

Now cd into `spring-web-annotation` and execute `mvn org.apache.tomcat.maven:tomcat7-maven-plugin:run`. You should see your Spring application starting and be able to browse `http://localhost:8080/spring-web-annotation` URL.

There are lot of cool stuff you can do with Spring MVC. Checkout their awesome docs for more details.
