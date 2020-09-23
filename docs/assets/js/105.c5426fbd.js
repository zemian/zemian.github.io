(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{488:function(e,a,t){"use strict";t.r(a);var n=t(10),r=Object(n.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("I sometimes help out users in Quartz Scheduler forums. Once in a while some one would\nask how can he/she setup the Quartz inside a web application. This is actualy a fairly\nsimple thing to do. The library already comes with a "),t("code",[e._v("ServletContextListener")]),e._v(" that\nyou can use to start a Scheduler. I will show you a simple webapp example here.")]),e._v(" "),t("p",[e._v("First create a Maven "),t("code",[e._v("pom.xml")]),e._v(" file.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('<?xml version="1.0" encoding="UTF-8"?>\n<project xmlns="http://maven.apache.org/POM/4.0.0"\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n    xsi:schemaLocation=\n        "http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">\n\n    <modelVersion>4.0.0</modelVersion>\n\n    <groupId>quartz-web-demo</groupId>\n    <artifactId>quartz-web-demo</artifactId>\n    <packaging>war</packaging>\n    <version>1.0-SANPSHOT</version>\n\n    <dependencies>\n        <dependency>\n            <groupId>org.quartz-scheduler</groupId>\n            <artifactId>quartz</artifactId>\n            <version>2.2.0</version>\n        </dependency>\n    </dependencies>\n\n</project>\n')])])]),t("p",[e._v("Then you need to create a "),t("code",[e._v("src/main/webapp/META-INF/web.xml")]),e._v(" file.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('<?xml version="1.0" encoding="UTF-8"?>\n <web-app version="2.5"\n    xmlns="http://java.sun.com/xml/ns/javaee"\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n    xsi:schemaLocation=\n        "http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">\n\n     <context-param>\n         <param-name>quartz:config-file</param-name>\n         <param-value>quartz.properties</param-value>\n     </context-param>\n     <context-param>\n         <param-name>quartz:shutdown-on-unload</param-name>\n         <param-value>true</param-value>\n     </context-param>\n     <context-param>\n         <param-name>quartz:wait-on-shutdown</param-name>\n         <param-value>true</param-value>\n     </context-param>\n     <context-param>\n         <param-name>quartz:start-on-load</param-name>\n         <param-value>true</param-value>\n     </context-param>\n\n     <listener>\n         <listener-class>org.quartz.ee.servlet.QuartzInitializerListener</listener-class>\n     </listener>\n\n </web-app>\n')])])]),t("p",[e._v("And lastly, you need a "),t("code",[e._v("src/main/resources/quartz.properties")]),e._v(" config file for Scheduler.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("# Main Quartz configuration\norg.quartz.scheduler.skipUpdateCheck = true\norg.quartz.scheduler.instanceName = MyQuartzScheduler\norg.quartz.scheduler.jobFactory.class = org.quartz.simpl.SimpleJobFactory\norg.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool\norg.quartz.threadPool.threadCount = 5\n")])])]),t("p",[e._v("You may configure\n"),t("a",{attrs:{href:"http://quartz-scheduler.org/documentation/quartz-2.2.x/configuration/",target:"_blank",rel:"noopener noreferrer"}},[e._v("many other things"),t("OutboundLink")],1),e._v(" with Quartz,\nbut above should get you started as in In-Memory scheduler.")]),e._v(" "),t("p",[e._v("Now you should able to compile and run it.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("bash> mvn compile\nbash> mvn org.apache.tomcat.maven:tomcat7-maven-plugin:2.1:run -Dmaven.tomcat.port=8081\n")])])]),t("h2",{attrs:{id:"how-to-configure-logging-for-quartz-scheduler"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-to-configure-logging-for-quartz-scheduler"}},[e._v("#")]),e._v(" How to configure logging for Quartz Scheduler")]),e._v(" "),t("p",[e._v("Another frequently asked question is how do they setup logging and see the DEBUG level\nmessages. The Quartz Schedulers uses SLF4J, so you have many\n"),t("a",{attrs:{href:"http://saltnlight5.blogspot.com/2013/08/how-to-configure-slf4j-with-different.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("loggers options"),t("OutboundLink")],1),e._v("\nto choose. I will show you how to setup Log4j for example below.")]),e._v(" "),t("p",[e._v("First, add this to your "),t("code",[e._v("pom.xml")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("        <dependency>\n            <groupId>org.slf4j</groupId>\n            <artifactId>slf4j-log4j12</artifactId>\n            <version>1.7.5</version>\n        </dependency>\n")])])]),t("p",[e._v("Then add "),t("code",[e._v("src/main/resources/log4j.properties")]),e._v(" file to show messages onto STDOUT.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("log4j.rootLogger=INFO, stdout\nlog4j.logger.org.quartz=DEBUG\nlog4j.appender.stdout=org.apache.log4j.ConsoleAppender\nlog4j.appender.stdout.layout=org.apache.log4j.PatternLayout\nlog4j.appender.stdout.layout.ConversionPattern=%5p [%t] (%F:%L) - %m%n\n")])])]),t("p",[e._v("Restart your web application on command line, and now you should see all the DEBUG\nlevel logging messages coming from Quartz library.")]),e._v(" "),t("p",[e._v("With everything running, your next question might be asking how do you access the scheduler\nfrom your web application? Well, when the scheduler is created by the servlet context listener,\nit is stored inside the web app’s ServletContext space with\n"),t("code",[e._v("org.quartz.impl.StdSchedulerFactory.KEY")]),e._v(" key. So you may retrieve it and use it in your\nown Servlet like this:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('public class YourServlet extends HttpServlet {\n    public init(ServletConfig cfg) {\n        String key = "org.quartz.impl.StdSchedulerFactory.KEY";\n        ServletContext servletContext = cfg.getServletContext();\n        StdSchedulerFactory factory = (StdSchedulerFactory) servletContext.getAttribute(key);\n        Scheduler quartzScheduler = factory.getScheduler("MyQuartzScheduler");\n        // TODO use quartzScheduler here.\n    }\n}\n')])])]),t("p",[e._v("Now you are on your way to build your next scheduling application!")]),e._v(" "),t("p",[e._v("Have fun!")])])}),[],!1,null,null,null);a.default=r.exports}}]);