---
title: Exploring Spring Controller with Spring Form Tag
date: 2013-10-29T00:00:00-05:00
tags:
  - spring
---

In the past [article](http://saltnlight5.blogspot.com/2013/10/exploring-spring-controller-with-jstl.html), I have shown you how to process an plain HTML form with Spring controller. But a more powerful way to process form is to use Spring&#8217;s `@ModelAttribute` and its `spring:form` tags. I will show you how to get that started here by modifying last article&#8217;s project setup. We will simply modify the Comment form and controller to use this feature.

In the same project, modify the `src/webapp/comment.jsp` view file into this:

    <%@ taglib prefix="spring" uri="http://www.springframework.org/tags/form" %>
    <spring:form modelAttribute="comment">
      <table>
        <tr>
            <td><spring:textarea path="text" rows="20" cols="80"/></td>
        </tr>
        <tr>
            <td colspan="2">
            <input type="submit" value="Post"/>
            </td>
        </tr>
      </table>
    </spring:form>

This view now use the `spring:form` tag to render the comment form instead of plain HTML. I have only shown you one element here, but the `spring:form` tag library also comes with all the matching HTML form elements that helps you quickly render the form with data binded. This automatically triggers the `CommentController` when you submit. We will need to modify that to capture the form.

    package springweb.controller;
    
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.validation.BindingResult;
    import org.springframework.web.bind.annotation.ModelAttribute;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestMethod;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.servlet.ModelAndView;
    import springweb.data.Comment;
    import springweb.data.CommentService;
    
    import javax.servlet.http.HttpServletRequest;
    import java.util.List;
    
    @Controller
    public class CommentController {
    
        @Autowired
        private CommentService commentService;
    
        @RequestMapping(value="/comments")
        public ModelAndView comments() {
            List<Comment> comments = commentService.findComments();
            ModelAndView result = new ModelAndView("/comments");
            result.addObject("comments", comments);
            return result;
        }
    
        @ModelAttribute("comment")
        public Comment createFormModelAttribute() {
            return Comment.create("");
        }
    
        @RequestMapping(value="/comment")
        public String comment() {
            return "comment";
        }
    
        @RequestMapping(value="/comment", method = RequestMethod.POST)
        public ModelAndView postComment(HttpServletRequest req,
                                    @ModelAttribute("comment") Comment comment) {
            String fromUrl = req.getRequestURI();
            String user = req.getRemoteUser();
            String userIp = req.getRemoteAddr();
            comment.setFromUserIp(userIp);
            comment.setFromUser(user);
            comment.setFromUrl(fromUrl);
            commentService.insert(comment);
            ModelAndView result = new ModelAndView("comment-posted");
            result.addObject("comment", comment);
            return result;
        }
    }

The difference in this controller compare to the old one is we used `@ModelAttribute` with an `form` object (or Spring calls it a `command` object.) We can name it, which I called `comment` here. It&#8217;s just a java POJO class, nothing special. But it is used to capture all the form input and then pass to Controller, which is called data binding. Notice that it will instanciate by `createFormModelAttribute()` method as you request the form view first. If you pre-populate the pojo with text, then it will automatically shows in the form! When user submit the controller will process in `postComment()` method, and the form object is re-populated with new form input again for processing. This allows you to work with form in pure Object style, and in many ways, it&#8217;s shorter and cleaner compare to plain HTML form.

There are much to the Spring MVC form processing. One powerful feature is it able to help you orgainze the `form` object validation and collect the error messages. Spring also helps localize your error message text etc. You may read more on their reference doc.
