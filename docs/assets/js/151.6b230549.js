(window.webpackJsonp=window.webpackJsonp||[]).push([[151],{533:function(e,t,n){"use strict";n.r(t);var a=n(10),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("I love the fact that JDK comes with a ScriptEngine. It's so flexible when you want to evaluate and troubleshoot your application that's already deployed in an server environment. Add this REST endpoint into a Java EE app, and it will give you instant access to internal states of the app.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('package myrestapp;\n\nimport java.io.StringReader;\nimport java.util.logging.Logger;\nimport javax.script.Bindings;\nimport javax.script.ScriptEngine;\nimport javax.script.ScriptEngineManager;\nimport javax.servlet.ServletContext;\nimport javax.servlet.http.HttpServletRequest;\nimport javax.ws.rs.POST;\nimport javax.ws.rs.Path;\nimport javax.ws.rs.core.Context;\n\n/**\n * Give instant access to your internal application with dynamic scripting.\n * \n * <p>Example script:\n * <pre>\n * "sc" + servletContext + ", req=" + request;\n * </pre>\n * \n * <p>Example2\n * <pre>\n * names = servletContext.getAttributeNames();\n * while(names.hasMoreElements()) {\n *   name = names.nextElement();\n *   println(name);\n * }\n * </pre>\n * \n * <p>Example on how to import Java packages and classes.\n * <pre>\n * importPackage(Packages.java.text);\n * df = new SimpleDateFormat("MM/dd/yyyy");\n * dt = df.parse("01/01/2014");\n * </pre>\n */\n@Path("script")\npublic class ScriptResource {\n    private static final Logger logger = Logger.getLogger(ScriptResource.class.getName());\n    \n    @Context\n    private ServletContext servletContext;\n        \n    @POST\n    public String script(@Context HttpServletRequest request, String scriptText) throws Exception {\n        String engineName = "JavaScript";\n        ScriptEngineManager manager = new ScriptEngineManager();\n        ScriptEngine engine = manager.getEngineByName(engineName);\n        logger.info("Running script text length=" + scriptText.length() + ", engine=" + engine);\n        Object result = null;\n        try (StringReader reader = new StringReader(scriptText)) {\n            Bindings bindings = engine.createBindings();\n            bindings.put("servletContext", servletContext);\n            bindings.put("request", request);\n            result = engine.eval(reader, bindings);\n        }\n        logger.info("Result " + result);\n        return "RESULT=" + result;\n    }\n}\n')])])]),n("p",[e._v("Notice that I gave couple JavaScript examples in the comment area already. You will have access to two binding variables that should give you full access to many internal components of your application. And here is a "),n("a",{attrs:{href:"http://docs.oracle.com/javase/7/docs/technotes/guides/scripting/programmer_guide",target:"_blank",rel:"noopener noreferrer"}},[e._v("quick reference on scripting JDK 7"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("p",[e._v("Need an UI to test out this endpoint? How about give the \"Advance Rest Client\" Chrome Extension a try? (Thanks to my co-worker's Chris Griffith for showing me this cool extension. It's really handy tool to have!).")]),e._v(" "),n("p",[e._v("UPDATES (12/8/2014)")]),e._v(" "),n("ul",[n("li",[n("p",[e._v('If you are using FireFox, try the "RESTClient" add-ons.')])]),e._v(" "),n("li",[n("p",[e._v("If you are using JDK7 Rhino JavaScript engine, here is a good ref for help: "),n("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Scripting_Java",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Scripting_Java"),n("OutboundLink")],1)])]),e._v(" "),n("li",[n("p",[e._v("If you're in a EE6 web application and doesn't have REST enabled yet, then simply add a class like this to your application. It should automatically configure an endpoint that you can access as \""),n("a",{attrs:{href:"http://localhost/rest/script",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://localhost/rest/script"),n("OutboundLink")],1),e._v('".')])])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('package myrestapp;\n\nimport javax.ws.rs.ApplicationPath;\nimport javax.ws.rs.core.Application;\n\n/**\n * This is the main entry into REST Application that bootstrap the provider.\n */\n@ApplicationPath("rest")\npublic class RestApplication extends Application {\n}\n')])])])])}),[],!1,null,null,null);t.default=r.exports}}]);