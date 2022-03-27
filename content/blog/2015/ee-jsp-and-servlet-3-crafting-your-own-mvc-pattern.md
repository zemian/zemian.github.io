Title: EE JSP and Servlet 3 - Crafting Your Own MVC Pattern
Date: 2015-03-13 00:00:00-05:00
Tags: jsp,servlet



The combination of JSP and Servlet allows you to develope MVC pattern
web application easily. The main focus of MVC pattern is that we want to
write a Controller logic that can produce data Model, and then let the
View to display these data and generate the desired HTML output. These
are done so we may separate the concern on each layer, and makes
developing larger application easier. In EE, we can map a Servlet to a
URL and let the Servlet becomes the Contoller, and when all data model
are gathered and stored in request, session or application scope, we can
then forward to a JSP for rendering output.

Now the last part is CONTROLLER, which can be verbose and a bit raw feel
if you were to write a Servlet class per each. So we can improve this
part and define a simplier interface to let developer write controller
easier. Here I will show you how a simple MVC style of code can look
like.

[mvc-example](https://github.com/saltnlight5/java-ee6-examples/tree/master/mvc-example)

