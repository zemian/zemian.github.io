title=EE Servlet 3: How to Setup Backend Services in a Web Application
date=2015-01-09
type=post
tags=servlet
status=published
~~~~~~
In a web application, providing user interfacing (UI) is often only half of the job. Many applications have requirements that's supported by backend services. Some example of backend services are scheduler process (batch processing), listen to a queue and respond when messages come in, or simple thing such as storing information for the entire application to use. These global data often needs to be shared between all Servlet (for each request processor) classes. Here I will show you how and where you should add such backend services in a Servlet based application.

Before we begin though, I would like to explain how a Servlet application store data variables (after all backend services are just simply Java objects). There are 3 major areas where you can add and share data (we sometimes call these areas in different "space", "scope" or "context"). You may also think of each of these area as a hash Map with unique keys and data values.

1. Application scope - This is a global, application wide storage map space that's allocated for your instance of web application. Each web application will have its unique space. Even if you deploy the same WAR file into a a domain server, they each will get their own space. You can get a hold of this space by implementing javax.servlet.ServletContextListener interface. This interface also has two callback methods that will get invoked when your application is starting (init) or shutting down (destroy). In these method you can do your own one-time application or services setup and clean up logic. You can store any Java objects by using ServletContext#setAttribute(key, value) method. This storage is not persistent externally but only in server memory. So the more you add to it, the more memory you will need (usually you only want to hold the the references to your service objects, so typically don't have memory issue). This is the location where you should create backend services and initialize it, then add the instances to the space so you may retrieve it later.

You may also use the Singleton Pattern to create a Application wide context area to hold your own business services as space, but you will still need ServletContextListener if you need to initialize it in a web application environment.

2. Request scope - This is a single HTTP request process storage map space, exits only for a specific request, or tempory. This map space is also not persistent. You will have access to this space inside your Servlet code by handling one of the HTTP action method. You will add data by using HttpServletRequest#setAttribute(key, value) method. Usually these stored data is used to pass to a VIEW processing layer (such as JSP) to construct HTML output. You have already seen some of my preview post that uses this inside a Servlet component.

Note also that inside a Servlet method that process a request, you will also have access to the Application space method above by using HttpServletRequest#getServletContext()#getAttribute(key) method. 

3. Session scope - This is a special space where you can track a specific user interacations to the applicatoin as a series of conversation requests, or so call a user session. Remember that a HTTP request is stateless, so you will need this space if you want to store some data to share between multiple requests, but they should be isolated for each client browser user. This is usually used when  implementing user login and resource restriction in an application. You can add to this space using the HttpServletRequest#getSession(true)#setAttribute(key, value) method in a Serlvet class. The application server will automatically return you the same session object or space everytime for that specific client user 

Handling user session can be tricky though, so you'll have to spend time and carefully designing your application to implement the proper solution for your need. I will write a seperate post on how to use Session scope in future, but for now I can show you an exmaple of how I initialize my web Application with custom services inside. You can find this code in my [servlet3-example](https://github.com/saltnlight5/java-ee6-examples/tree/master/servlet3-example).

package zemian.servlet3example.web;

import javax.servlet.ServletContext;
import zemian.servlet3example.service.Application;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import zemian.service.logging.Logger;

@WebListener
public class WebAppStartup implements ServletContextListener {
    private static final Logger LOGGER = new Logger(WebAppStartup.class);

    @Override
    public void contextInitialized(ServletContextEvent event) {
        LOGGER.debug("WebApp is starting up.");
        Application app = Application.getInstance();
        app.init();
                
        // Store the app instances.        event.getServletContext().setAttribute(Application.SERVLET_CONTEXT_KEY, app);
        LOGGER.info("WebApp initialized.");        
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        Application app = Application.getInstance();
        app.destroy();
        LOGGER.info("WebApp destroyed.");
    }
}

With this in place, I can easily add any custom business backend services inside the Application class, and and then have any of the Servlet code access it. Notice that I am using Servlet 3's @WebListener annotation so there is no config is needed. You simply package along your WAR application and it will be detected by your EE application server!

NOTE: Try to use Application as holder class only and not place any logic in it. With EE 6, you can easily replace this with CDI bean injection as alternate solution.