---
title: EE JSP: The Reversed Jacket of Servlet
date: 2015-01-25
tags:
  - jsp
---
Generating HTML from Servlet is only practical if you have small amount of pages, or needed fine control of the content you are generating, (binary PDF etc). For most application, the output is going to be HTML, and we need a better way to do this; and that's where the JSP (Java Server Pages) comes in.

With JSP, you write and focus on the HTML content in a file; then only when you needed dynamic or condition logic in between the content, you would insert the Java code, which called the Scriptlet. When the application server process the JSP page, it will automatically generate a Servlet class that write these JSP file's content out (as you would programatically writing it using PrintWriter as shown in my previous posts). Wherever you have the Scriptlet in JSP, it will be inlined in the generated Servlet class. The generated jsp servlet classes are all managed, compiled and deployed by the application server within your application automatically. In short, the JSP is nothing more than the reverse jacket of the Servlet.

Here is a simple example of JSP that print Hello World and a server timestamp.

<!DOCTYPE html>
<html>
    <body>
        <p>Hello World!</p>
        <p>Page served on <%= new java.util.Date()%></p>
    </body>
</html>

Simply save this as text file named hello.jsp inside your src/main/webapp maven based folder, and it will be runnable within your NetBeans IDE. For JSP, you do not need to configure URL mapping as in Serlvet, and it's directly accessable from your context path. For example, above should display in your browser by http://localhost:8080/hello.jsp URL.

Notice the example also show how you can embed Java code. You can place a method or object inside <%= %> scriptlet, and it will use the resulted object's toString() method output to concatenate to the HTML outside the scriptlet tag. You can also define new methods using <%! %> scriptlet tag, or execute any code that does not generate output using <% %> scriptlets. Note that you can add comments in JSP between <%-- --%> scriptlet as well.

JSP also allows you to insert "Page Directives" to control how the JSP container render the result. For example, you can change the result content type by insert this on top of the page

    <%@ page contentType="text/txt" %>

Another often used page directive is import Java package so you don't need to prefix it on each Java statement line.

    <%@ page imporet="java.util.*" %>

     

    ...

     

    <p>Page served on <%= new Date()%></p>

There are many more directives you can use. Checkout the JSP spec doc for more details.

Besides inserting your own Java code, JSP also predefined some variables you may access directly without declaring them. Here is an example that displays most of these built-in implicit variables.

<!DOCTYPE html>
<html>
    <body>
        <h1>JSP Examples</h1>
        <p>Implicit Variables</p>
        <table>
            <tr>
                <td>Name</td><td>Instance</td><td>Example</td>
            </tr>
            <tr>
                <td>applicationScope</td><td>${applicationScope}</td><td>${applicationScope['myAppName']}</td>
            </tr>
            <tr>
                <td>sessionSope</td><td>${sessionSope}</td><td>${sessionSope['loginSession']}</td>
            </tr>
            <tr>
                <td>pageScope</td><td>${pageScope}</td><td>${pageScope['javax.servlet.jsp.jspConfig']}</td>
            </tr>
            <tr>
                <td>requestScope</td><td>${requestScope}</td><td>${requestScope['foo']}</td>
            </tr>
            <tr>
                <td>param</td><td>${param}</td><td>${param['query']}</td>
            </tr>
            <tr>
                <td>header</td><td>${header}</td><td>${header['user-agent']}</td>
            </tr>
            <tr>
                <td>cookie</td><td>${cookie}</td><td>${cookie['JSESSIONID']}</td>
            </tr>
            <tr>
                <td>pageContext</td><td>${pageContext}</td><td>${pageContext.request.contextPath}</td>
            </tr>
        </table>
        <p>Page served on <%= new java.util.Date()%></p>
    </body>
</html>  

In above example, I accessed the implicit variables using the JSP Expression Language (EL) syntax rather than the <%= %> scriptlet. The EL is more compact and easier to read, however it only can read variable that existed in any of the request, session or application scopes. The EL uses DOT notation to access fields or even nested fields from the object variable; assuming the fields have corresponding getter methods that is. EL can also access map with "myMap[key]" format, or a list with "myList[index]" syntax. Most of these implicit variables can be access as a Map object, and they exposed mainly from the ServletHttpRequest object on the request, as you would from your own Servlet class.

JSP can be seen as a template language in the web application. It helps generate the "VIEW" part of the application. It let you or the authoring in your team to focus on the HTML and look and feel of the content. It can help building larger web application much easier. Be careful about using excessive and complex logic Java code inside your JSP files though, as it will make it harder to debug and read; especially if you have a Java statement that throws an exception. The line number from the stacktrace would be harder to track and match to your Scriptlet code. Also imagine if you start to have JavaScript code inside JSP files, then it can get really messy. Better to keep these in separate files. If you must embed Java code in JSP, try to wrap it in a single line of Java invocation call. Better yet, try to process request using Servlet code, and generate all the data you need to display in JSP by insert them into the request scope space, and then forward to a JSP file for rendering. With this pattern, you can actually limit usage of scriptlet 
in JSP, and only use EL and JSP tags.

You can find above code in my [jsp-example](https://github.com/saltnlight5/java-ee6-examples/tree/master/jsp-example) in GitHub.