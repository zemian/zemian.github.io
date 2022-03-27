Title: EE Servlet 3 - Getting started with web application module and a landing page
Date: 2014-12-27 00:00:00-05:00
Tags: servlet



## Getting started with Servlet 3

Web application module in Java EE is probably the most common type of application module that a developer would encounter and work on. That's because not only it can provide users the UI, but it also supoprt many common web application patterns: Model View Controller, Filter, Session, Context Listener, Http Request, Paramters, Query, and Form handling, Http Response writer, redirect, error etc. You can do all these with Servlet spec alone, so getting to know it well is an important part of learning in writing good web application.

Servlet has been around for a long time, and many developers are already familiar with it. There are many other web frameworks such as Tapestry or Spring MVC that are built on top of Servlet. These frameworks provide separate programming models that suppose to easy development process, but nontheless the core concept is still based on the Servlet technologies (or at least tightly integrated if it were to run by any web container server). In this post, I will try to highlight how to get a web module application started, and configure a typical need: a default landing page.

## Hello World

Like many things in EE environment, you would write small components as Java class and then deploy them onto a server and let the server manage it's lifecycle and execution. So as with Servlet, you would write a simple Java class that implements Servlet interface, package it and deploy, and server will do it's magic.

Before Servlet 3.0, your servlet component is configured and mapped in web.xml file, but now you can just add an annotation directly on your servlet class and the app server should be able to automatically deploy and run it. Here is an example of a classic hello world.
```
package zemian.servlet3example.web;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        writer.println("<!DOCTYPE html>");
        writer.println("<html>");
        writer.println("<body>");
        writer.println("<p>Hello World!</p>");
        writer.println("</body>");
        writer.println("</html>");
    }
}
```
In this Servlet, I simply extends an existing base 
HttpServlet class that should be available in all Serlvet spec. and in 
response to a http GET request, I write a Hello World message out 
as html response.

You may find above code in  [servlet3-example](https://github.com/saltnlight5/java-ee6-examples/tree/master/servlet3-example). Build and deploy it and then you can access it with http://localhost/servlet3-exmaple/hello. (I have many other servlet examples in the project, but you may just concentrate in this class for now.)

## How to configure a default landing page in Servlet 3 

A typical application server will likely default a landing page to "index.html" or "index.jsp" if it exists. For example, if I have written a IndexSerlvet class and mapped to "/index" instead, then you need to tell the server default to there. This will happen if users only type http://localhost/servlet3-example with context path in URL only.

Despite you can can do just about most things in Java annotations with Servlet 3.0 as equivalent to the content found web.xml file, but not the welcome file though. So to do this, you would still need to create this good old web.xml. Here is an example
```
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" 
         version="3.0">
    <welcome-file-list>
        <welcome-file>index</welcome-file>
    </welcome-file-list>
</web-app>
```
Above example will default the landing page to a Servlet url mapping with "/index" path.

TIPS: Do NOT to use "/" prefix when definining welcome-file element, else you will get a page not found error and likely your server won't even print any error message in the log! 

Another alternate solution instead of overrite welcome-file is simply add a "index.jsp" file in root of webapp folder and do a redirect like this:
```
<% response.sendRedirect(request.getContextPath() + "/index"); %>
```

