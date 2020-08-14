---
title: EE CDI: Better Backend Service Management through Automatic Service Injection
date: 2015-02-09
tags:
  - cdi
---
In one of my [previous post](http://saltnlight5.blogspot.com/2015/01/ee-servlet-3-how-to-setup-backend.html), I have introduced the Application class that holds backend services, and we are exposing the services to Servlet by a singleton instance lookup pattern. This usage is very common and the Application class is been used as a global space holder in your application. Starting with EE 6, there is a new spec API introduced called CDI (context dependency injection) that can replace this kind of direct service lookup in your application. The CDI is a Java objects container (services in our case), or sometimes
 called "beans container" that automatically manged the objects life 
cycles for you; and then it can "inject" into places where you need 
them. Using CDI to manage your services can make your Servlet easier to test, and less code to maintain since you don't have to write and maintain the Application class. 

Let's see how we can turn our previous example to use CDI.

First step is to remove the Application class have have, and to use injection of UserService instead. In our example, we initialize Application in WebAppStartup, so that can be remove; and we will initialize CDI instead. By the spec, all we need is to add a beans XML file in src/main/webapp/WEB-INF folder.

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://java.sun.com/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/beans_1_0.xsd">
</beans>

That's all you need to enable CDI in your EE application!

Now how can we do service injection, Inside LoginServlet is where we are using UserService, and that's where we want CDI to provide us the managed instance of UserService. So refactor UserService and remove Application usage there, but replace with a member field for UserService by injection using the @Inject annotation.

import javax.inject.Inject;
...

@WebServlet("/login")
public class LoginServlet  extends HtmlWriterServlet {
    
    @Inject
    private UserService userService;

...
    private boolean login(HttpServletRequest req) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        
        if (userService.validate(username, password)) {
... 

There is one more area we need to take care of to complete the refactoring. Our  UserService has a init() method that's originally called by Application class. But now that we removed it, we need this to be called by CDI container since it now manage the UserSerivce instance lifecycle. And the CDI spec provides us a simple way to use the @PostConstruct annotation to do so.

import javax.annotation.PostConstruct;
...

public class UserService {
    ...

    @PostConstruct
    public void init() {
...

That's all the modifications you need to switch from your custom Application singleton pattern to use CDI to manage your backend services.

One question you might ask is how does CDI know when to create new instance of UserService? The answer is by the @Inject annotation. Upon startup of the CDI container, it scans your application packages to see what's needed to be injected. It also depends when you needed this service instance to be injected. In our case, it's inside a Servlet, so it's not needed until the HTTP request is called for, so CDI will create the new instance under what's called "Request" scope. The CDI will inject a instance of UserService into LoginServlet right before it's processing the request.

With CDI available, you will quickly appreciate the power and simplicity of the EE application server. There are many more CDI features you may use in your application; and I hope I have sparked your interests to explore further on your own.