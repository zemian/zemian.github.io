(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{546:function(e,t,a){"use strict";a.r(t);var n=a(10),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("Generating HTML from Servlet is only practical if you have small amount of pages, or needed fine control of the content you are generating, (binary PDF etc). For most application, the output is going to be HTML, and we need a better way to do this; and that's where the JSP (Java Server Pages) comes in.")]),e._v(" "),a("p",[e._v("With JSP, you write and focus on the HTML content in a file; then only when you needed dynamic or condition logic in between the content, you would insert the Java code, which called the Scriptlet. When the application server process the JSP page, it will automatically generate a Servlet class that write these JSP file's content out (as you would programatically writing it using PrintWriter as shown in my previous posts). Wherever you have the Scriptlet in JSP, it will be inlined in the generated Servlet class. The generated jsp servlet classes are all managed, compiled and deployed by the application server within your application automatically. In short, the JSP is nothing more than the reverse jacket of the Servlet.")]),e._v(" "),a("p",[e._v("Here is a simple example of JSP that print Hello World and a server timestamp.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("<!DOCTYPE html>\n<html>\n    <body>\n        <p>Hello World!</p>\n        <p>Page served on <%= new java.util.Date()%></p>\n    </body>\n</html>\n")])])]),a("p",[e._v("Simply save this as text file named hello.jsp inside your src/main/webapp maven based folder, and it will be runnable within your NetBeans IDE. For JSP, you do not need to configure URL mapping as in Serlvet, and it's directly accessable from your context path. For example, above should display in your browser by "),a("a",{attrs:{href:"http://localhost:8080/hello.jsp",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://localhost:8080/hello.jsp"),a("OutboundLink")],1),e._v(" URL.")]),e._v(" "),a("p",[e._v("Notice the example also show how you can embed Java code. You can place a method or object inside <%= %> scriptlet, and it will use the resulted object's toString() method output to concatenate to the HTML outside the scriptlet tag. You can also define new methods using <%! %> scriptlet tag, or execute any code that does not generate output using <% %> scriptlets. Note that you can add comments in JSP between <%-- --%> scriptlet as well.")]),e._v(" "),a("p",[e._v('JSP also allows you to insert "Page Directives" to control how the JSP container render the result. For example, you can change the result content type by insert this on top of the page')]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('<%@ page contentType="text/txt" %>\n')])])]),a("p",[e._v("Another often used page directive is import Java package so you don't need to prefix it on each Java statement line.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('    <%@ page imporet="java.util.*" %>\n\n     \n\n    ...\n\n     \n\n    <p>Page served on <%= new Date()%></p>\n')])])]),a("p",[e._v("There are many more directives you can use. Checkout the JSP spec doc for more details.")]),e._v(" "),a("p",[e._v("Besides inserting your own Java code, JSP also predefined some variables you may access directly without declaring them. Here is an example that displays most of these built-in implicit variables.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("<!DOCTYPE html>\n<html>\n    <body>\n        <h1>JSP Examples</h1>\n        <p>Implicit Variables</p>\n        <table>\n            <tr>\n                <td>Name</td><td>Instance</td><td>Example</td>\n            </tr>\n            <tr>\n                <td>applicationScope</td><td>${applicationScope}</td><td>${applicationScope['myAppName']}</td>\n            </tr>\n            <tr>\n                <td>sessionSope</td><td>${sessionSope}</td><td>${sessionSope['loginSession']}</td>\n            </tr>\n            <tr>\n                <td>pageScope</td><td>${pageScope}</td><td>${pageScope['javax.servlet.jsp.jspConfig']}</td>\n            </tr>\n            <tr>\n                <td>requestScope</td><td>${requestScope}</td><td>${requestScope['foo']}</td>\n            </tr>\n            <tr>\n                <td>param</td><td>${param}</td><td>${param['query']}</td>\n            </tr>\n            <tr>\n                <td>header</td><td>${header}</td><td>${header['user-agent']}</td>\n            </tr>\n            <tr>\n                <td>cookie</td><td>${cookie}</td><td>${cookie['JSESSIONID']}</td>\n            </tr>\n            <tr>\n                <td>pageContext</td><td>${pageContext}</td><td>${pageContext.request.contextPath}</td>\n            </tr>\n        </table>\n        <p>Page served on <%= new java.util.Date()%></p>\n    </body>\n</html>  \n")])])]),a("p",[e._v('In above example, I accessed the implicit variables using the JSP Expression Language (EL) syntax rather than the <%= %> scriptlet. The EL is more compact and easier to read, however it only can read variable that existed in any of the request, session or application scopes. The EL uses DOT notation to access fields or even nested fields from the object variable; assuming the fields have corresponding getter methods that is. EL can also access map with "myMap[key]" format, or a list with "myList[index]" syntax. Most of these implicit variables can be access as a Map object, and they exposed mainly from the ServletHttpRequest object on the request, as you would from your own Servlet class.')]),e._v(" "),a("p",[e._v('JSP can be seen as a template language in the web application. It helps generate the "VIEW" part of the application. It let you or the authoring in your team to focus on the HTML and look and feel of the content. It can help building larger web application much easier. Be careful about using excessive and complex logic Java code inside your JSP files though, as it will make it harder to debug and read; especially if you have a Java statement that throws an exception. The line number from the stacktrace would be harder to track and match to your Scriptlet code. Also imagine if you start to have JavaScript code inside JSP files, then it can get really messy. Better to keep these in separate files. If you must embed Java code in JSP, try to wrap it in a single line of Java invocation call. Better yet, try to process request using Servlet code, and generate all the data you need to display in JSP by insert them into the request scope space, and then forward to a JSP file for rendering. With this pattern, you can actually limit usage of scriptlet\nin JSP, and only use EL and JSP tags.')]),e._v(" "),a("p",[e._v("You can find above code in my "),a("a",{attrs:{href:"https://github.com/saltnlight5/java-ee6-examples/tree/master/jsp-example",target:"_blank",rel:"noopener noreferrer"}},[e._v("jsp-example"),a("OutboundLink")],1),e._v(" in GitHub.")])])}),[],!1,null,null,null);t.default=o.exports}}]);