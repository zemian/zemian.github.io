---
title: Choosing Technology Stack to build a common platform
date: 2013-05-29T00:00:00-05:00
tags:
  - architecture
---

There are many talks in Java community about Spring vs Java EE, and how one group would argue you should use one and not other etc. When I see this, I can't help but to think why can't we use them both together? In fact I think using them both effectively would create a great technology stack for building an infrastructure for large company who like to provide a common platform that may host and run many different applications and projects.

# Why combine Spring and Java EE together?

When writing software, we create and build libraries/framework that can be reuse and help us get things done faster. Spring is such a swiss-army knife like library that allows application to be build in an un-intrusive way and with many easier wrappers and helpers classes. This is what I call developer friendliness library.

However many people don't realize is that Spring is just a library and wrappers to many things that ease the development. Spring has a web framework layer to let you write MVC web app, but you still need a Servlet Container (server). Spring provides data layer that mostly wraps other JPA/Hibernate/JDBC that integrate well in their IoC container, but the actual ORM implementation is outside of Spring (eg: Hibernate). Spring wraps JMS or even JNDI for development, but you still need a JMS server or JNDI provider. Spring has a Transaction Manager Abstract layer, but it's just a wrapper (for single DB, it's the database vendor that actually provided the ACID attributes of your transaction guarantee, not Spring). If you want to atomic transaction on multiple resources (such as JMS and Database, or multiple databases) you still need a "real" Transaction Manager (JTA)!

So now you see, in order to build a successful enterprise application, you need Spring on top of many vendor provided features. If you are not careful, you could be lock into many proprietary services that's hard to integrate and deploy. This is where Java EE comes in. It's a spec layout that vendor must provide most of those services in a standard manner. Hence any JEE compliance server would provide services with standard API that suppose to works the similar way.

Now there must be balance to make. From my experience, the more standards you enforce, then less "developer friendliness" it will get. But at the same time, without standard, it's hard to provide common infrastructure such as API, runtime server and/or even OS environment for deployment. This is the reason I would argue that combining Spring with Java EE would bring most practical and effective platform to IT.

# Choosing the Technology Stack

Not every project is created equals and their needs are different. So providing a common technology stack that will satisfy all projects is impossible. But we can certainly try to create a common one that satisfy most of projects need. Also choosing a concrete library/stack is very opinionated, and no matter which actual implementation is selected, there are always going to be pro and cons. With this in mind, I will try to layout my own personal choices of a technology stack that I think it will provide the most flexible platform to host majority projects and applications. Specially in a big corporate environment.

I will choose a Java EE application server as common platform. From this, I will choose some "developer friendliness" libraries that replace (or add on-top) few existing EE standards to gain productivity. I think EE has come a long way and getting better through each spec iteration, but I still feel it is more flexibility in using Spring as IoC container verse using CDI when wiring POJO services together. Plus the Spring comes with a very flexible MVC framework layer that's effective and easy to development in compare to plain Servlet API. Once these are combined and available as a common platform, I think it can support many kind of applications in various IT environment.

Starting Java EE 6, there are two profiles a server must provide now. So let's start exploring the stack from these two views.

# JEE Web profile - Lighter web based driven application

- Use Spring MVC (controller, form, validation, ModelAndView and IoC configurations) instead of plain Servlet API programming.
- Write backend business service logic as POJO as possible and use Spring IoC to wire them. Do not abuse this. I personally think Spring IoC is more flexible and easier to use in compare to CDI.
- Use JPA for data service layer instead of JDBC API programming.
- Use JSON data exchange format. From experience, JSON is much more efficient and easier to work in comparison to XML.
- Views options:

- Use well formed xhtml/Bootstraps/jquery/AJAX -> If you need just static pages and some client side interactive
- Freemarker (or Thymeleaf) -> If you need a lot of dynamic content to generate, use an template engine! This is better than JSP alone.
- Vaadin -> If you need desktop application behavior like on web browser side. This is easier in compare to JSF. 

- Servlet 3.0 now support asynchronous requests. This solve many challenging problems in web domain. Take advantage of it if needed! (Latest Spring MVC has support for this already.) 

# JEE 6 Full profile - Full EE features application

- On top of everything mentioned above in Web Profile.
- Use JMS for any messaging need that fall into Point-To-Point or Publish/Subscribe domain.
- Use JTA when you need atomic transaction for multiple databases and/or JMS delivery.
- Use standard JAX-RS (RESTful web service API) for exposing external services. Use JSON data exchange format.
- Use consistent Spring IoC for services injection. It's more flexible and easier to work with in compare to CDI.
- Use POJO services and wire by Spring instead of EJB if possible. I found them more easier to test and development.
- Plus whatever else EE spec somes with that it supports such as (JavaMail and JCA etc. usually Spring will have a easier wrapper for these API as well.) 

# Apache Camel - Light Weight ESB

The Camel project is not an EE standard, however from my experience is that many common IT work can be easily done with simple Camel route/workflow. The development and style of Camel is simple to understand and easy to test. It can be run as stand alone application/service or as part of a web application. I believe it's a great value to add on top of a common platform with above. You would use it whenever you need the following:

- For any integration pattern like work flow process (eg: bridge a file poller to a web service to a JMS queue to database etc.)
- For creating business workflow process.
- For any ETL workflow process.
- For easy mapping of business requirement workflow to code logic process

# Which EE application server to use

I think this is subjective as well, but we need to choose one that's fit for business need. I personally favor JBoss because it's open source, and yet they provide commercial backed version of their application server. Being an open source based product, it gives developers greater flexibility in learning and exploring the platform. I also see many benefits in their in house projects such as testing tools and libraries are open and benefit to developers.

## What about Tomcat server?

Tomcat is a very well known Servlet server. However it is only a Web container that support Servlet/JSP application. It does not provide JMS or JTA features that provided by a Java EE server. It's a fact that many web application requirements can be satisfy with simple Tomcat server. However in a large IT env, you will often you need other services that provided by Java EE server. In many cases, people will simply run Tomcat webapp and bridge to other Java EE server when needed.

Well, this is reason I would select a Java EE server in the first place. Specially with JEE6, it provided Web Profile that stripped down to mostly Web Container features, then should make the server faster to start-up and less extra services loaded. However, in case when application needed EE features, the platform we provide will able to support it.
