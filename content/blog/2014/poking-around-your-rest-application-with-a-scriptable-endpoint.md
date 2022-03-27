Title: Poking around your REST application with a scriptable endpoint
Date: 2014-10-17 00:00:00-05:00
Tags: restful,scripting


I love the fact that JDK comes with a ScriptEngine. It's so flexible when you want to evaluate and troubleshoot your application that's already deployed in an server environment. Add this REST endpoint into a Java EE app, and it will give you instant access to internal states of the app.
```
package myrestapp;

import java.io.StringReader;
import java.util.logging.Logger;
import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

/**
 * Give instant access to your internal application with dynamic scripting.
 * 
 * <p>Example script:
 * <pre>
 * "sc" + servletContext + ", req=" + request;
 * </pre>
 * 
 * <p>Example2
 * <pre>
 * names = servletContext.getAttributeNames();
 * while(names.hasMoreElements()) {
 *   name = names.nextElement();
 *   println(name);
 * }
 * </pre>
 * 
 * <p>Example on how to import Java packages and classes.
 * <pre>
 * importPackage(Packages.java.text);
 * df = new SimpleDateFormat("MM/dd/yyyy");
 * dt = df.parse("01/01/2014");
 * </pre>
 */
@Path("script")
public class ScriptResource {
    private static final Logger logger = Logger.getLogger(ScriptResource.class.getName());
    
    @Context
    private ServletContext servletContext;
        
    @POST
    public String script(@Context HttpServletRequest request, String scriptText) throws Exception {
        String engineName = "JavaScript";
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName(engineName);
        logger.info("Running script text length=" + scriptText.length() + ", engine=" + engine);
        Object result = null;
        try (StringReader reader = new StringReader(scriptText)) {
            Bindings bindings = engine.createBindings();
            bindings.put("servletContext", servletContext);
            bindings.put("request", request);
            result = engine.eval(reader, bindings);
        }
        logger.info("Result " + result);
        return "RESULT=" + result;
    }
}
```
Notice that I gave couple JavaScript examples in the comment area already. You will have access to two binding variables that should give you full access to many internal components of your application. And here is a [quick reference on scripting JDK 7](http://docs.oracle.com/javase/7/docs/technotes/guides/scripting/programmer_guide).

Need an UI to test out this endpoint? How about give the "Advance Rest Client" Chrome Extension a try? (Thanks to my co-worker's Chris Griffith for showing me this cool extension. It's really handy tool to have!).

UPDATES (12/8/2014) 

- If you are using FireFox, try the "RESTClient" add-ons.

- If you are using JDK7 Rhino JavaScript engine, here is a good ref for help: https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Scripting_Java 

- If you're in a EE6 web application and doesn't have REST enabled yet, then simply add a class like this to your application. It should automatically configure an endpoint that you can access as "http://localhost/rest/script".
```
package myrestapp;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * This is the main entry into REST Application that bootstrap the provider.
 */
@ApplicationPath("rest")
public class RestApplication extends Application {
}
```

