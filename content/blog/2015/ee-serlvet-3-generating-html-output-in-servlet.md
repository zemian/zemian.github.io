Title: EE Serlvet 3 - Generating HTML output in Servlet
Date: 2015-01-01 00:00:00-05:00
Tags: servlet


If you just need to handle a handful of requests URI in your EE web module, then it might be easier to generate your own HTML response in your Servlet code instead of using a full blown template library. As part of my examples, I tried out a very simple Java DSL that generate html output when writing your own Serlvet. The code looks like this:
```
package zemian.servlet3example.web;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/index")
public class IndexServlet extends HtmlWriterServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HtmlWriter html = createHtmlWriter(req, resp);
        String message = getMessage(req, html);
        
        html.header()
            .h(1, "Welcome to Servlet 3 Example")
            .p("Let's explore Java Servlet 3.x Features.")
            .p(message)
            .ul(
                html.link("Index", "/index"),
                html.link("Hello", "/hello"),
                html.link("Sys Props", "/sys-props")
            )
            .footer();
    } 
}
```
I wrote a base HtmlWriterServlet class that provide a method where you can get an instance of a HtmlWriter builder. The benefit of wrapping the HTML like builder is that it's more easier to read and helps generate correct well form tags. For example the "ul" and "table" accepts Java List or Map object, and it generates the correct html tags.

Here is another example how I generate a table view of Java System Properties page with few lines of code:
```
package zemian.servlet3example.web;

import java.io.IOException;
import java.util.TreeMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/sys-props")
public class SysPropsServlet extends HtmlWriterServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HtmlWriter html = createHtmlWriter(req, resp);
        TreeMap sysProps = new TreeMap(System.getProperties());
        html.header()
            .h(1, "Java System Properties")
            .table(sysProps)
            .footer();
    }
}
```
The simple [HtmlWriter](https://github.com/saltnlight5/java-ee6-examples/blob/master/servlet3-example/src/main/java/zemian/servlet3example/web/HtmlWriter.java)class provide few html builder methods and it can help generate HTML links with relative context paths. You can easily further improve it to help generate more HTML code such as form tags etc.

Also, note that ServletResponse object let you have full control on writing custom responses, so you are not restricted to only returing HTML. You can write binary output such as PDF or even MP3 files. You simply need to control the Response Writer and the correct corresponding content mime type and size that will return.

You can get these code at [servlet3-example](https://github.com/saltnlight5/java-ee6-examples/tree/master/servlet3-example)

