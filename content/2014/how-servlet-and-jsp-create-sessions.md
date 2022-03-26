---
title: How Servlet and JSP create sessions
date: 2014-10-26T00:00:00-05:00
tags:
  - servlet
---
In Servlet, you may get the Session object by "httpServletRequest.getSession(true)". The "true" flag will create the session if it doesn't already exist, else it gets the existing session.

Now if you want to check whether you have the session exists or not (without have to create one if doesn't exist), you need to pass in "false" and then check for "null".
```
Session session = httpServletRequest.getSession(false);
if (session == null) {
  // do something without creating session object.
}
```
Now comes the trick party. If you run above code and then dispatch the request to render a JSP page, you might quickly come to find out that the container will create a new Session object still! It turns out that by default JSP will create new Session object if you do not have one! To disable this, you need to set this explicitly on top of the JSP page:
```
 <% page session="false" %>
```
Only with this you will able to actually prevent creation of unnecessary Session object if you were to use JSP for output! Something to watch out for when debugging session based application.
