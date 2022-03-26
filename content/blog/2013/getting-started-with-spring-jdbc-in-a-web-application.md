---
title: Getting started with Spring JDBC in a web application
date: 2013-10-09T00:00:00-05:00
tags:
  - spring
  - jdbc
---

I have shown you how to setup a [basic Spring 3 MVC web application](https://zemian.github.io/2013/10/getting-started-with-annotation-based.html) in my previous article. Reusing that project setup as template, I will show you how to enhance it to work with JDBC. With this you can store and retrieve data from database. We will add a new controller and a data service through Spring so you can see how Spring injection and annotation configuration works together.

A direct JDBC based application is easy to setup in comparison to a full ORM such as Hibernate. You don&#8217;t need to worry AOP, TranactionManager, Entity mapping and full array of other configurations. On top of the JDK&#8217;s `java.jdbc` API, the Spring comes with `spring-jdbc` module that can boots your productively with their well known `JdbcTemplate` class. Let&#8217;s explore how this can be setup and run as web application.

## Getting started and project setup

For demo purpose, I will use the in-memory version of H2Database as JDBC store. It&#8217;s simple to use and setup. And if you decided to use their FILE or TCP based database, you would simply have to re-set the datasource, and you may continue to explore more.

We will start by adding new dependencies to your existing `spring-web-annotation/pom.xml` file.

      <dependency>
       <groupId>com.h2database</groupId>
       <artifactId>h2</artifactId>
       <version>1.3.163</version>
      </dependency>
      <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-jdbc</artifactId>
       <version>3.2.4.RELEASE</version>
      </dependency>

With this, you will have access to Spring module classes for configuration. Find the previous `src/main/java/springweb/WebApp.java` file in your existing project and add what&#8217;s new compare to below:

    package springweb;
    
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.ComponentScan;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
    import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
    import org.springframework.web.servlet.config.annotation.EnableWebMvc;
    import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
    
    import javax.sql.DataSource;
    
    public class WebApp extends AbstractAnnotationConfigDispatcherServletInitializer {
        @Override
        protected Class<?>[] getRootConfigClasses() {
            return new Class<?>[]{ RootConfig.class };
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
    
        @Configuration
        @ComponentScan("springweb.data")
        public static class RootConfig {
          @Bean
          public DataSource dataSource() {
            DataSource bean = new EmbeddedDatabaseBuilder()
              .setType(EmbeddedDatabaseType.H2)
              .addScript("classpath:schema.sql")
              .build();
            return bean;
          }
        }
    }
    

What&#8217;s new in here is we introduced a new `RootConfig` class that will be loaded inside `getRootConfigClasses()` method. The `RootConfig` is just another Spring annotation based configuration that creates a new Spring context for bean definitions. We&#8217;ve created a bean there that will run the in-memory database. The bean returned by the builder also conveniently implemented the `javax.sql.DataSource` interface, so we can actually inject this into any data service and start using it immediately.

One more cool thing about the Spring embedded database builder is that it also runs any SQL script as part of the startup! For this demo, we will create a `PING` table in the `src/main/resources/schema.sql` file. This file is visible to Spring as in root of the CLASSPATH due to Maven standard source structure.

    CREATE TABLE PING (
      ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      TAG VARCHAR(1024) NOT NULL,
      TS DATETIME NOT NULL
    );

That&#8217;s the datasource setup. Now notice that I did not add this datasource Spring bean definition into existing `WebAppConfig` class. The reason is that we want a separate Spring context to configure all service level beans, while reserving the `WebAppConfig` for all Spring MVC related beans (such as Controller, URL mapping etc). This helps organize your bean definitions in hierarchical order of Spring contexts; with `RootConfig` as parent and `WebAppConfig` as child layers. This also means that all service beans in `RootConfig` are automatically visible to `WebAppConfig`; for the purpose of injection etc.

Also notice that with separated config classes, we are able to specify two distinct packages to scan for service components; we use `springweb.controller` for `WebAppConfig` and `springweb.data` for `RootConfig`. This is important and it can save you some troubles by letting Spring auto detecting your annotation based components.

## Creating Data Service

Now it&#8217;s time we use the JDBC, so let&#8217;s write a data service class under `src/main/java/springweb/data/PingService.java` file.

    package springweb.data;
    
    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.jdbc.core.JdbcTemplate;
    import org.springframework.stereotype.Repository;
    
    import javax.sql.DataSource;
    import java.util.Date;
    import java.util.List;
    import java.util.Map;
    
    @Repository
    public class PingService {
        public static Log LOG = LogFactory.getLog(PingService.class);
    
        private JdbcTemplate jdbcTemplate;
    
        @Autowired
        public void setDataSource(DataSource dataSource) {
            this.jdbcTemplate = new JdbcTemplate(dataSource);
        }
    
        public void insert(String tag) {
            LOG.info("Inserting Ping tag: " + tag);
            jdbcTemplate.update("INSERT INTO PING(TAG, TS) VALUES(?, ?)", tag, new Date());
        }
    
        public List<Map<String, Object>> findAllPings() {
            return jdbcTemplate.queryForList("SELECT * FROM PING ORDER BY TS");
        }
    }

The service is very straight forward. I expose two methods: one for insert and one for retrieve all Ping data. Noticed that I used `@Repository` to indicate to Spring that this class is a component service that perform data service. Also note how we inject the `DataSource` using a setter method, and then instantiate the `JdbcTemplate` as member field. From that we can take full advantage of the Spring JDBC API for query and update.

A note on logging. Spring core itself uses Apache `common-logging`, so I reused that API without even explicitly declare them in my `pom.xml`. If you want to see more details from log output, you should add `log4j` logger implementation to the project, and it should automatically work. I will leave that as your exercise.

Next we will need to write a Controller that can bring data to web UI page. We will create this under `src/main/java/springweb/controller/PingController.java` file.

    package springweb.controller;
    
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.ResponseBody;
    import springweb.data.PingService;
    
    import java.util.List;
    import java.util.Map;
    
    @Controller
    public class PingController {
    
        @Autowired
        private PingService pingService;
    
        @RequestMapping(value="/ping/{tag}", produces="text/plain")
        @ResponseBody
        public String pingTag(@PathVariable("tag") String tag) {
            pingService.insert(tag);
            return "Ping tag '" + tag + "' has been inserted. ";
        }
    
        @RequestMapping(value="/pings", produces="text/plain")
        @ResponseBody
        public String pings() {
            List<Map<String, Object>> result = pingService.findAllPings();
      if (result.size() == 0)
       return "No record found.";
    
            StringBuilder sb = new StringBuilder();
            for (Map<String, Object> row : result) {
                sb.append("Ping" + row).append("\n");
            }
            return sb.toString();
        }
    }

In this controller, you can easily see that the Ping data is fetched and updated through our data service by injection. I&#8217;ve declared and map URL `/ping/{tag}` to insert Ping data into the database. Spring has this very nice shorthand syntax annotation that can extract parameter from your URL path. In this case it let user to pass a simple tag keyword to be inserted as Ping record; so we can identify the source in database.

The other controller handler `/pings` URL is very straight forward; it simply returns all the records from PING table.

For demo purpose, I choose to not use JSP as view, but to return plain text directly from the Controller. Spring let you do this by adding `@ResponseBody` to the handler method. Notice also we can specify the content type as `text/plain` as output directly using the annotation.

## Testing

To see your hard labor with above, you simply need to run the Maven tomcat plugin. The previous article has shown you an command to do that. Once you restarted it, you should able to open a browser and use these URLS for testing.

- 
[http://localhost:8081/spring-web-annotation/ping/tester1](http://localhost:8081/spring-web-annotation/ping/tester1)

- 
[http://localhost:8081/spring-web-annotation/ping/tester2](http://localhost:8081/spring-web-annotation/ping/tester2)

- 
[http://localhost:8081/spring-web-annotation/ping/tester3](http://localhost:8081/spring-web-annotation/ping/tester3)

- 
[http://localhost:8081/spring-web-annotation/pings](http://localhost:8081/spring-web-annotation/pings)

## Happing programming

From this simple exercise, you can quickly see Spring MVC brings you many benefits; and a lot of fun in developing web application. Spring, by design principles, tends to be developers friendly, boots productivity and un-intrusively in your environment. It&#8217;s one of the reason I like to work with it a lot. I hope you enjoy this tutorial and go further explore on your own.

Happy programming!
