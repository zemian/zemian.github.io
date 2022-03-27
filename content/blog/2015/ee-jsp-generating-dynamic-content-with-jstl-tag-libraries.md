Title: EE JSP - Generating Dynamic Content with JSTL Tag Libraries
Date: 2015-02-06 00:00:00-05:00
Tags: jstl


Besides writing your own [Custom Tags in JSP](https://zemian.github.io/2015/02/ee-jsp-generating-dynamic-content-with.html), you will find that Java EE actually provides a set of Java Standard Tag Library (JSTL) ready for you to use. These built-in tags include repeating (for-loop) tags, if condition tags, variable declaration and output tags etc. The Libraries also come with many utility functions and international message formatting tags. Here is an example how it looks like.
```
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
    <body>
        <h1>JSTL Examples</h1>
        <h2>List of Application Context: ${applicationScope}</h2>
        <table>
            <c:forEach var="entry" items="${applicationScope}">
            <tr>
                <td>${entry.key}</td>
                <td>
                    <c:out value="${entry.value}"/>
                </td>
            </tr>
            </c:forEach>
        </table>
        
        <h2>List of Session Context: ${sessionScope}</h2>
        <table>
            <c:forEach var="entry" items="${sessionScope}">
            <tr>
                <td>${entry.key}</td>
                <td>
                    <c:out value="${entry.value}"/>
                </td>
            </tr>
            </c:forEach>
        </table>
        
        <h2>List of Page Context: ${pageScope}</h2>
        <table>
            <c:forEach var="entry" items="${pageScope}">
            <tr>
                <td>${entry.key}</td>
                <td>
                    <c:out value="${entry.value}"/>
                </td>
            </tr>
            </c:forEach>
        </table>
        
        <h2>List of Request Context: ${requestSope}</h2>
        <table>
            <c:forEach var="entry" items="${requestSope}">
            <tr>
                <td>${entry.key}</td>
                <td>
                    <c:out value="${entry.value}"/>
                </td>
            </tr>
            </c:forEach>
        </table>
        
        <h2>List of Query Parameters: ${param}</h2>
        <table>
            <c:forEach var="entry" items="${param}">
            <tr>
                <td>${entry.key}</td>
                <td>
                    <c:out value="${entry.value}"/>
                </td>
            </tr>
            </c:forEach>
        </table>
        
        <h2>List of Header Parameters: ${header}</h2>
        <table>
            <c:forEach var="entry" items="${header}">
            <tr>
                <td>${entry.key}</td>
                <td>
                    <c:out value="${entry.value}"/>
                </td>
            </tr>
            </c:forEach>
        </table>        
        
        <h2>List of Cookies: ${cookie}</h2>
        <table>
            <c:forEach var="entry" items="${cookie}">
            <tr>
                <td>${entry.key}</td>
                <td>
                    <c:out value="${entry.value}"/>
                </td>
            </tr>
            </c:forEach>
        </table>
    </body>
</html>
```
I used the core tag here to display map entries of few implicit variables. You may explore more on those tags declarations I have define on top of the example page from the Spec. These code are from the [jsp-example](https://github.com/saltnlight5/java-ee6-examples/tree/master/jsp-example) from GitHub.

GLASSFISH NOTE: When deploying above example in GlassFish 3/4, you will run into a NullPointerException and causing the page resulted in error. It turns out that GF server added a internal variable named com.sun.jsp.taglibraryCache  in ServletContext (Application Scope) that throws NPE when its toString() is called! To workaround this, I created [jstl-example2.jsp](https://github.com/saltnlight5/java-ee6-examples/blob/master/jsp-example/src/main/webapp/jstl-example2.jsp) that wraps the ${entry.value} into a custom JSTL function so that it guarantees to return an output without throwing exception. So the lesson learned is that you should always return a String and not throw Exception when overriding toString() of a Java class. It's just bad practice.

