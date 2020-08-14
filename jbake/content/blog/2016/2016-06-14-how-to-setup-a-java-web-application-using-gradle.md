---
title: How to setup a Java web application using Gradle
date: 2016-06-14
tags:
  - gradle
---
For basic java and Gradle, it's really simple. All you need is one line in build.gradle file and you can start compiling Java source under src/main/java folder.

apply plugin: 'java'

But to setup a useful web application,  you would need little more. Here I have another example of Gradle 2.7 script file for building a Java web application. I also have noted few things I have discovered in the comments.

# A Java web app project
# There should be a src/main/webapp as web content directory
apply plugin: 'war'
apply plugin: 'jetty'

# Change jetty default port from 8080
httpPort = 9000

# A repository must be given to fetch dependencies below.
repositories {
    mavenCentral()
}

# Library dependencies
dependencies {
    // JDK lang support
    // Ouch! Gradle does not support 'provided' scope! Let's use compile for now.
    //provided 'org.projectlombok:lombok:1.16.6'
    compile 'org.projectlombok:lombok:1.16.6'

    // Testing
    testCompile 'junit:junit:4.12',
        'org.hamcrest:hamcrest-library:1.3'

    // Database
    runtime 'mysql:mysql-connector-java:5.1.37'   

    // Scripting
    //runtime 'org.codehaus.groovy:groovy-all:2.4.5'
    /*
    NOTE: Error if you include groovy with gradle+jetty!!!
    java.lang.ExceptionInInitializerError:
groovy.lang.GroovyRuntimeException: Conflicting module versions. Module [groovy-all is loaded in version 2.3.10 and you are trying to load version 2.4.5
     // Verify your groovy version using the following:
import javax.script.*
out.println(new ScriptEngineManager().getEngineFactories())
out.println(org.codehaus.groovy.jsr223.GroovyScriptEngineFactory.class.getProtectionDomain().getCodeSource().getLocation())
    */ 
}

I also have this JSP in src/main/webapp/script.jsp folder

<%@ page import="javax.script.*, java.io.*" %>

<%
// Initialize parameters
String engineName = request.getParameter("engine");
if (engineName == null) engineName = "Groovy";
String code = request.getParameter("code");
if (code == null) code = "";
%>

<!-- form: Script input code -->
<h1>Scripting</h1>
<form method="POST">
<textarea name="code" cols="120" rows="25"><%= code %></textarea>
<p/><input type="submit" value="Submit"/>
</form>

<pre>
<%
if (request.getMethod().equals("POST")) {
// Process form and evaluate script code
ScriptEngine se = new ScriptEngineManager().getEngineByName(engineName);
if (se == null) {
out.println("ERROR: " + engineName + " engine not found! Use 'engine' parameter to change it.");
} else {
try {
Bindings b = se.createBindings();
b.put("request", request);
b.put("out", out);
Object result = se.eval(code, b);

out.println(engineName + " script result:");
out.println("" + result);
} catch (Exception e) {
out.println("ERROR: " + engineName + " script failed to evaluate!");
e.printStackTrace(new PrintWriter(out));
}
}
}
%>

</pre>

With this script.jsp, you can write something like this to test out your db connection.

// Groovy script:
import java.sql*
conn = DriverManager.getConnection('jdbc:mysql://localhost/test', 'dev', 'dev123')
out.println("conn=" + conn)
conn.close()

And just for fun, I have created a data class using ProjectLombok generator in src/main/java/myjava/MyData.java

package myjava;
import java.util.*;

@lombok.Data
public class MyData {
private Integer id;
private String name;
private Date createdDate;
private List<MyData> dataList;
private Map<String, MyData> dataMap;

}

I also have a unit test in src/test/java/myjava/MyDataTest.java

package myjava;

import org.junit.Test;
import static org.junit.Assert.assertThat;
import static org.hamcrest.Matchers.*;

public class MyDataTest {
@Test
public void tesGeneratedGetterSettersAndToString() {
MyData d = new MyData();
d.setId(12345);
d.setName("foo");
assertThat(d.getId(), is(12345));
assertThat(d.getName(), is("foo"));
assertThat(d.toString(), is("MyData(id=12345, name=foo, createdDate=null, dataList=null, dataMap=null)"));
}

}

To compile code, type command: gradle compileJava

To run test, type command: gradle test(A nice feature of Gradle is that it auto generate test reports! Look for them in your build/reports folder.)

To run web app, type command: gradle jettyRun