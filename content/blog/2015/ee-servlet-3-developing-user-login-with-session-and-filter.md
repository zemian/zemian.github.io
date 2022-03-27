Title: EE Servlet 3 - Developing User Login with Session and Filter
Date: 2015-01-16 00:00:00-05:00
Tags: servlet


I have introduced the Application class in my previous post where you can setup backend services. One example service I added is the UserService. This service will load a Java users properties file that contains username and password sets; and it's used later to authenticate users to login into the web application. Now I will show how the login part is done using standard Servlet API along with this backend service.

At a high level, what we want is to restrict some web resources (this means certain URLs provided by Servlets such as "/sysprops", or "/user") to only client users who are known in our users properties file. Users may identify themself with the matching password. This is typically done with a user login form, authenticate it, then insert a login token into Http Session scope space. This login token then can be used to verify whether to allow users to access the restricted resources or not. We only interested in a single authorization (no roles are defined, and any logged in user may access any protected URLs.)

You have already seen an example that mapped to "/sysprops" URL in one of my previous post provided by the SysPropsServlet, which it simply generate a HTML table of System information. These are sensitive information, so we want to protect this URL. We would need to create a class that implements javax.servlet.Filter interface, and then add the "/sysprops" URL with this filter so it can pre-process the request before the actual Servlet does. This filter gives us a place to inspect the HTTP request object and abort the request if needed to, thus restricting the access.
```
package zemian.servlet3example.web;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import zemian.service.logging.Logger;

@WebFilter(urlPatterns={"/sys-props", "/user"})
public class LoginRequiredFilter implements Filter {
    private static final Logger LOGGER = new Logger(LoginRequiredFilter.class);
    public static final String LOGIN_REDIRECT = "LOGIN_REDIRECT";
   
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (request instanceof HttpServletRequest) {
            HttpServletRequest req = (HttpServletRequest) request;
            LOGGER.trace("Checking LoginSession token for uri=%s", req.getRequestURI());
            LoginSession loginSession = LoginServlet.getOptionalLoginSession(req);
            if (loginSession == null) {
                LOGGER.debug("No LoginSession token found; forwarding request to login page.");
                // We need to save the old URI so we can auto redirect after login.
                req.setAttribute(LOGIN_REDIRECT, req.getRequestURI());
                req.getRequestDispatcher("/login").forward(request, response);
                return;
            } else {
                LOGGER.debug("Request allowed using LoginSession token=%s", loginSession.getId());
            }
        }
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }

}
```
Notice that you can configure this filter to match more than one URL that you want to protect. You can even use wildcard pattern such as "/*" and it will protect every URLs in your application! The filter simply looks into the Http Session space for a LoginSession object that we will create later. If it's found then it let the request through, otherwise it will redirect to a Login form page, which is served by LoginServlet class (notice the RETURN statement for early exit of the filter method without calling the filter chain!).

The LoginServlet class is a form processing Servlet that will prompt user for username and password. If it succeed, then we will insert the LoginSession token object into the HttpSession space space, which is what the filter above is looking for. Here is the processing Servlet code.
```
package zemian.servlet3example.web;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import zemian.service.logging.Logger;
import zemian.servlet3example.service.Application;
import zemian.servlet3example.service.UserService;

@WebServlet("/login")
public class LoginServlet  extends HtmlWriterServlet {
    private static final Logger LOGGER = new Logger(LoginServlet.class);
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HtmlWriter html = createHtmlWriter(req, resp); 
        String message;
        
        // Check to see if we are doing logout or not.
        LoginSession loginSession = getOptionalLoginSession(req);
        if (loginSession != null && req.getParameter("logout") != null) {
            logout(req);
            message = "Your have successfully logged out.";
        } else {    
            message = (String)req.getAttribute("message");
            if (message == null)
                message = "";
        }   
        
        // Show a login form
        String redirectUri = (String)req.getAttribute(LoginRequiredFilter.LOGIN_REDIRECT);
        String redirectHtmlTag = "";
        if (redirectUri != null) {
            redirectHtmlTag = "<input type='hidden' name='redirectUri' value='" + redirectUri + "'/>";
        }
        html.header()
            .h(1, "Please Login")
            .p(message)
            .println("<form method='post' action='login'>")
            .println(redirectHtmlTag)
            .println("<p/>Username: <input type='text' name='username'/>")
            .println("<p/>Password: <input type='password' name='password'/>")
            .println("<p/><input type='submit' value='Submit'/>")
            .println("</form>")
            .footer();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        LOGGER.debug("Processing login form.");
        if (login(req)) {
            // Login succeed, we should auto redirect user if exists.
            String redirectUri = req.getParameter("redirectUri");
            if (redirectUri != null) {
                LOGGER.debug("Redirect after login to: %s", redirectUri);
                resp.sendRedirect(redirectUri);
                return;
            }
        }
        
        // Show the form again in case login failed or user didn't provide a redirect
        doGet(req, resp);
    }    
       
    protected LoginSession createLoginSession(HttpServletRequest req, String username) {
        LoginSession result = new LoginSession(username);
        req.getSession(true).setAttribute(LoginSession.LOGIN_SESSION_KEY, result);
        return result;
    }
    
    protected void removeLoginSession(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session != null) {
            session.removeAttribute(LoginSession.LOGIN_SESSION_KEY);
        }
    }

    private boolean login(HttpServletRequest req) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        
        UserService userService = Application.getInstance().getUserService();
        if (userService.validate(username, password)) {
            LOGGER.info("User %s logged in successfully.", username);
            // Create Session Data here after successful authenticated.
            LoginSession loginsession = getOptionalLoginSession(req);
            if (loginsession == null) {
                createLoginSession(req, username);
                req.setAttribute("message", "You have successfully logged in.");
            } else {
                req.setAttribute("message", "You already have logged in.");             
            }
        } else {
            LOGGER.info("User %s failed to login.", username);
            req.setAttribute("message", "Invalid login.");
        }
        return true;
    }
    
    /** Return LoginSession if found in HttpSession scope, else return NULL value. */
    public static LoginSession getOptionalLoginSession(HttpServletRequest req) {
        LoginSession result = null;
        HttpSession session = req.getSession(false);
        if (session != null)
            result = (LoginSession)session.getAttribute(LoginSession.LOGIN_SESSION_KEY);
        return result;
    }
}
```
Inside LoginServlet class is where we use the UserService service to validate username and password. We display the login form with a GET request, and then process the login with a POST action. Once username and password are checked, we create the LoginSession object. This is just a simple POJO to represent a session token; and you can hold any user information you want. I won't list here, but you can browse it on GitHub. Note that you should make it serializable though, because any data stored in HttpSession may be subject to be serialize/deserialize by your application server.

Notice also that I have implemented the Logout functionality into the LoginServlet class
 as well. You simply pass "logout" query parameter, and it will be 
detected and remove the login token from the session. Ensure you invalid
 the HttpSession itself when you do this, just to be in clean side. I 
also exposed a static helper `getOptionalLoginSession`

that is used between few of the classes to check whether user has logged in or not.

These few classes are simple but yet demonstrated the use of Servlet Filter and Servlet on how to manage Session data. This programming pattern allows users to have their own browsing session and privacy through the application.

If you are to run my [servlet3-example](https://github.com/saltnlight5/java-ee6-examples/tree/master/servlet3-example)  in a GlassFish server, you may login using any users listed in [here](https://github.com/saltnlight5/java-ee6-examples/blob/master/servlet3-example/src/main/resources/zemian/servlet3example/service/users.properties).

