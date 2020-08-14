---
title: EE JSP: Generating Dynamic Content with Custom Tag Libraries
date: 2015-02-02
tags:
  - jsp
  - tag
---
When developing View layer in a web application, you want to try not to duplicate content in JSP files as much as possible. The JSP spec API allows you to reduce this duplication by using tag libraries. A custom JSP tag is a user defined xml tag element that you can insert into JSP file to replace with some dynamic content.

Here is an simple [jsp-example](https://github.com/saltnlight5/java-ee6-examples/blob/master/jsp-example/) using a custom JSP tag that insert a server time stamp value:

<%@ taglib prefix="myapp" tagdir="/WEB-INF/myappTags" %>
<!DOCTYPE html>
<html>
    <body>
        <h1>Hello World!</h1>
        <p>Page served on <myapp:serverTime pattern="yyyy-MM-dd HH:mm:ss"/></p>
    </body>
</html>

JSP tags can also allow you to pass in parameters as attributes of the tag. In the example above <myapp:serverTime> tag uses a custom pattern attribute to control how the date string should be formatted.

JSP tags can also be nested with sub tags, or any HTML content elements. The nested JSP tags can provide a way for you to conditionally render the enclosed content. Using tag to render conditional content is more verbose due to XML structure, but it eliminates the use of direct Scriptlet code in JSP.

There are two ways you can create custom JSP tags. The first method is to implement the tag using pure Java code and then register it with a XML taglib definition file. I will skip this method for now and show you another easier way.

The second method uses "Tag Files" that are similar to JSP pages to construct a tag (remember that JSP tag is nothing more than just a placeholder for some content!). I am going to show you how the second method is done for above example. First create a serverTime.tag file under your src/main/webapp/WEB-INF/tags/myapp project folder.

<%@ attribute name="pattern" required="true" %>
<%@ tag import="java.util.Date, java.text.SimpleDateFormat" %>
<%= new SimpleDateFormat(pattern).format(new Date()) %>

The Tag File implementation depends on simple convention of file naming and location. Note that the src/main/webapp/WEB-INF/tags directory is a required path. Inside this folder,  you may create any sub folder you want to organize the tag files. In our case, it's the myapp directory. A Tag File can be just like any JSP file you would normally create, except the tag directives are little different. You can see the JSP spec for a complete list of them. Whatever you output from the Tag File, it will be inserted and replaced the caller of the tag. Notice how I use the pattern attribute parameter to allow user change the date pattern, and it's available in the Tag File inside the Scriptlet Java code as variable.

Since you can write Tag Files just as you would with JSP, I will again caution the excessive use of Java code Scriptlet even inside Tag Files. If you must call Java code, try to wrap the code and replace by single line call, or write the Tag implementation with pure Java code; especially if you have very complex business logic involve. This would bring debugging much easier on your code and to maintain.

JSP tags provide a powerful way to construct your View layer in the web application. It helps you reuse code or content, and generating a specific piece of response.