---
title: EE Servlet 3: Simple Form Processing
date: 2015-01-06
tags:
  - servlet
---
Form handling in web application is like bread and butter for most Web developers. It will not be much use if we can not capture users input and process it. So I have included a simple [FormServlet ](https://github.com/saltnlight5/java-ee6-examples/blob/master/servlet3-example/src/main/java/zemian/servlet3example/web/FormServlet.java)in my servlet3-example  that demonstrated few frequently used form inputs you might encounter. Here is how it looks like:

package zemian.servlet3example.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import zemian.service.logging.Logger;

@WebServlet("/form")
public class FormServlet extends HtmlWriterServlet {
    private static final Logger LOGGER = new Logger(FormServlet.class);
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HtmlWriter html = createHtmlWriter(req, resp);    
        String message = getMessage(req);
        
        html.header()
            .h(1, "User Data Form")
            .p(message)
            .println("<form method='post' action='form'>")
            .println("<p/>Username: <input type='text' name='username'/>")
            .println("<p/>Password: <input type='password' name='password'/>")
            .println("<p/>Choose a country: <select name='country' size='1'>")
            .println("<option default='true'>US</option>")
            .println("<option>China</option>")
            .println("<option>Korea</option>")
            .println("</select>")
            .println("<p/>Skills set: <input type='checkbox' name='skills' value='Java'/> Java")
            .println("<input type='checkbox' name='skills' value='Java EE'/>Java EE")
            .println("<input type='checkbox' name='skills' value='MySQL Database'/> MySQL Database")
            .println("<p/>Notes: <textarea name='notes' cols='50' rows='3'></textarea>")
            .println("<p/><input type='submit' value='Submit'/>")
            .println("</form>")
            .println(html.link("Back to Home", "/index"))
            .footer();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        LOGGER.info("Processing form.");
        Form form = new Form();
        form.setUsername(req.getParameter("username"));
        form.setPassword(req.getParameter("password"));
        form.setNotes(req.getParameter("notes"));
        form.setCountry(req.getParameter("country"));
        String[] skills = req.getParameterValues("skills");
        skills = (skills == null) ? new String[0] : skills;
        form.setSkills(Arrays.asList(skills));
        req.setAttribute("message", "Processed: " + form);
        doGet(req, resp);
    }
   
    private String getMessage(HttpServletRequest req) {
        String message = (String)req.getAttribute("message");
        if (message ==  null) {
            message = "";
        }
        return message;
    }
}

As usual, most forms are display with a http GET request and then process it with a POST action. Take a closer look, and pay close attention to how Servlet handle single vs multi values inputs. These exist because HTML form might allow users to choose multiple values from a single input tag/widget.

One common pattern developers do in form handling is to capture the input data into a "command object", "transfer object", or (in my example) "form" object; so that data can be pass into another layer of your application for further processing. This is a good design becuase it decouples the Web layer dependencies from your backend tier service layers. 

Another frequent dealt with area in form processing is data validation. If you capture your data as form object, then you will likely have two layers of validations. One layer is when you extract it right off the http request (usually from a String input), then you would validate such as is it a required field or optional, is the String value convertable to the expected and desiable type (integer or date etc). Second layer of validation might be further down in your service layer where you already have the form object constructed with correct types, but their values might not be valid per your application requirement. Most common invalid data is due to not conforming to the database constraints and thus not able to persist it. I didn't provide example above on validation, but you can eaisly improve the Servlet and further explore this on your own.

I like to mention one more note. There are many Java web frameworks out there that focus a LOT of attention on form handling, and they ought to help you develop application easier with less duplicated code. It is done usually with a very concrete programming model and style that, in many cases, shield you away from seing the HttpServletRequest object completly. All these are good (assuming the framework is a good quality one), but keep in mind that majority of cases when there is a problem occur, it's mostly at the framework specific layer, or even more likely your own code that use the framwork. And then you will be spending most of your debugging time learning the framework specific domain, rather than the Servlet spec layer.

For my example purpose I am trying to focus on EE API alone, so I will stay away from any extra frameworks other than the standard API. If you are a beginner, I strongly encourage you to study the Servlet API and see how form is handled, this gives you a more solid understanding of how the data come about in a web application. If you look further into the Java EE stack, it actually already has a framework that's called JSF as part of EE 6 standards. It's design is to help construct web pages as components model; and it lets you capture form data and automatically bind to a bean object in a much more smoother and integrated fashion. JSF is worthy of its own topic for future posts.