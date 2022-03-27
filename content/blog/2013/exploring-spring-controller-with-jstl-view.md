Title: Exploring Spring Controller with JSTL view
Date: 2013-10-16 00:00:00-05:00
Tags: spring



Let&#8217;s improve [our previous Spring JDBC application](https://zemian.github.io/2013/10/getting-started-with-spring-jdbc-in-web.html) with some more exploration on Spring MVC&#8217;s Controller development. I will show another exercise of writing a new Controller that processes a HTML form and use JSTL tags in JSP view pages.

To enable JSTL in Spring MVC application, you would need to add the following to the `WebAppConfig` config class. Let&#8217;s move it outside of `WebApp.java` and into it&#8217;s own top level class file in `src/main/java/springweb/WebAppConfig.java`.

    package springweb;
    
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.ComponentScan;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.EnableWebMvc;
    import org.springframework.web.servlet.view.InternalResourceViewResolver;
    
    @Configuration
    @EnableWebMvc
    @ComponentScan("springweb.controller")
    public class WebAppConfig {
        @Bean
        public InternalResourceViewResolver viewResolver() {
            InternalResourceViewResolver result = new InternalResourceViewResolver();
            result.setPrefix("/");
            result.setSuffix(".jsp");
            return result;
        }
    }

Inside the `InternalResourceViewResolver` bean, you define where to find your JSP pages that may have JSTL tags in them. The `prefix` setter is a path in relative to your `src/webapp` location. This allow you to hide your JSP files completely if you want to. For example, by setting it to `"/WEB-INF/jsp"` then you may move and store all JSP files into `src/webapp/WEB-INF/jsp` which is private in the web application. The `suffix` is just the file extension. These two values allow you to return a view name inside the controller with just the basename of your JSP file, which can be short as "/myform" or "/index" etc.

If you are to use Tomcat as your web container, you would need to add JSTL jar dependency as well, since the Tomcat server doesn&#8217;t come with standard tag library! So add this into the `pom.xml` file now.

            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>jstl</artifactId>
                <version>1.2</version>
            </dependency>

While you&#8217;re at the `pom.xml` file, you might want to add the Tomcat maven plugin so you can type less in command line when running your web application.

    <project>
    ...
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.tomcat.maven</groupId>
                    <artifactId>tomcat7-maven-plugin</artifactId>
                    <version>2.1</version>
                </plugin>
            </plugins>
        </build>
    ...
    </project>

With that, you should able to run `mvn tomcat7:run` in root of your project without plugin prefix.

So what does JSTL bring to your application? Well, quite a bit actually. It lets you use some standard JSP tags that&#8217;s frequently used when writing JSP views. I will demonstrate this with a set of Controller and views to capture user comments from the application. Note that I will try to show you how to work with Spring Controller in the most basic way only. The Spring actually comes with a custom `form` JSP tag that is much more powerful to use. I will reserve that as another article in another time. Today let us focus on learning more about basic Spring Controller and JSTL, and a bit more on Spring JDBC data service as well.

We want to capture user comment, so let&#8217;s add a database table to store that information. Add the following DDL into your `src/main/resources/schema.sql` file. Again, this is for H2 database per last article project setup.

    CREATE TABLE COMMENT (
      ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      TEXT VARCHAR(10240) NOT NULL,
      FROM_USER VARCHAR(15) NULL,
      FROM_USER_IP VARCHAR(15) NULL,
      FROM_URL VARCHAR(1024) NULL,
      TAG VARCHAR(1024) NULL,
      TS DATETIME NOT NULL
    );

This time, we will write a data model class to match this table. Let&#8217;s add `src/main/java/springweb/data/Comment.java`

    package springweb.data;
    
    import java.util.Date;
    
    public class Comment {
        Long id;
        String text;
        String fromUrl;
        String fromUser;
        String fromUserIp;
        String tag;
        Date ts;
    
        public Long getId() {
            return id;
        }
    
        public void setId(Long id) {
            this.id = id;
        }
    
        public String getText() {
            return text;
        }
    
        public void setText(String text) {
            this.text = text;
        }
    
        public String getFromUrl() {
            return fromUrl;
        }
    
        public void setFromUrl(String fromUrl) {
            this.fromUrl = fromUrl;
        }
    
        public String getFromUser() {
            return fromUser;
        }
    
        public void setFromUser(String fromUser) {
            this.fromUser = fromUser;
        }
    
        public String getFromUserIp() {
            return fromUserIp;
        }
    
        public void setFromUserIp(String fromUserIp) {
            this.fromUserIp = fromUserIp;
        }
    
        public String getTag() {
            return tag;
        }
    
        public void setTag(String tag) {
            this.tag = tag;
        }
    
        public Date getTs() {
            return ts;
        }
    
        public void setTs(Date ts) {
            this.ts = ts;
        }
    
        private String getTrimedComment(int maxLen) {
            if (text == null)
                return null;
            if (text.length() <= maxLen)
                return text;
            return text.substring(0, maxLen);
        }
    
        @Override
        public String toString() {
            return "Comment{" +
                    "id=" + id +
                    ", ts=" + ts +
                    ", text='" + getTrimedComment(12) + '\'' +
                    '}';
        }
    
        public static Comment create(String commentText) {
            Comment result = new Comment();
            result.setText(commentText);
            result.setTs(new Date());
            return result;
        }
    }

Just as previous artcicle, we will write a data service to handle insert and retrieve of the data model. We add a new `src/main/java/springweb/data/CommentService.java` file

    package springweb.data;
    
    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.jdbc.core.BeanPropertyRowMapper;
    import org.springframework.jdbc.core.JdbcTemplate;
    import org.springframework.jdbc.core.RowMapper;
    import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
    import org.springframework.stereotype.Repository;
    
    import javax.sql.DataSource;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;
    
    @Repository
    public class CommentService {
        public static Log LOG = LogFactory.getLog(CommentService.class);
    
        private JdbcTemplate jdbcTemplate;
        private SimpleJdbcInsert insertActor;
        private RowMapper<Comment> commentBeanRowMapper = new BeanPropertyRowMapper<Comment>(Comment.class);
    
        @Autowired
        public void setDataSource(DataSource dataSource) {
            this.jdbcTemplate = new JdbcTemplate(dataSource);
            this.insertActor = new SimpleJdbcInsert(dataSource)
                .withTableName("COMMENT")
                .usingGeneratedKeyColumns("ID");
        }
    
        public void insert(Comment comment) {
            LOG.info("Inserting Comment + " + comment);
    
            Map<String, Object> parameters = new HashMap<String, Object>(2);
            parameters.put("TEXT", comment.getText());
            parameters.put("FROM_USER", comment.getFromUser());
            parameters.put("FROM_USER_IP", comment.getFromUserIp());
            parameters.put("FROM_URL", comment.getFromUrl());
            parameters.put("TAG", comment.getTag());
            parameters.put("TS", comment.getTs());
            Number newId = insertActor.executeAndReturnKey(parameters);
            comment.setId(newId.longValue());
    
            LOG.info("New Comment inserted. Id=" + comment.getId());
        }
    
        public List<Comment> findComments() {
            String sql = "SELECT " +
                    "ID as id, " +
                    "TEXT as text, " +
                    "TAG as tag, " +
                    "TS as ts, " +
                    "FROM_USER as fromUser, " +
                    "FROM_USER_IP as fromUserIp, " +
                    "FROM_URL as fromUrl " +
                    "FROM COMMENT ORDER BY TS";
            List<Comment> result = jdbcTemplate.query(sql, commentBeanRowMapper);
            LOG.info("Found " + result.size() + " Comment records.");
            return result;
        }
    }

Since we did not use any fancy ORM but just plain JDBC, we will have to write SQL in the data service. But thanks to Spring goodies, it makes life much easier with helpers such as `SimpleJdbcInsert`, which handles DB insert and retrieval of auto generated key etc. And also notice that in query, we use the Spring&#8217;s `BeanPropertyRowMapper` to automatically convert JDBC resultset into a java bean `Comment` object! Simple, direct and quick.

Now we add the Spring controller in `src/main/java/springweb/controller/CommentController.java` to handle web requests.

    package springweb.controller;
    
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
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
    
        @RequestMapping(value="/comment")
        public String comment() {
            return "comment";
        }
    
        @RequestMapping(value="/comment", method = RequestMethod.POST)
        public ModelAndView postComment(HttpServletRequest req, @RequestParam String commentText) {
            String fromUrl = req.getRequestURI();
            String user = req.getRemoteUser();
            String userIp = req.getRemoteAddr();
            Comment comment = Comment.create(commentText);
            comment.setFromUserIp(userIp);
            comment.setFromUser(user);
            comment.setFromUrl(fromUrl);
            commentService.insert(comment);
            ModelAndView result = new ModelAndView("comment-posted");
            result.addObject("comment", comment);
            return result;
        }
    }

In this controller we map `/comment` URL to handle display of the HTML form, which returns the `comment.jsp` view. The method default to handle a HTTP `GET`. Note that we remapped same `/comment` URL to handle HTTP `POST` on a separated `postComment()` method! See how clean the Spring Controller can be in this demo to handle HTTP request. Pay very close attention to the parameters declared in the `postComment()` method. Spring automatically handles the HTTP request object and map to your method just based upon the types you declared! On some cases you need to be explicit with the help of annotation such as `@RequestParam`, but Spring does the parsing of HTTP request and extraction for you! This saves you tons of repeated boiler plate code if we were to write a direct Servlet code.

Now let&#8217;s see the view and how to use JSTL. The `/comments` URL is mapped to `src/main/webapp/comments.jsp` view file, which will list all `Comment` model objects.

    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:choose>
    <c:when test="${empty comments}">
        <p>There are no comments in system yet.</p>
    </c:when>
    <c:otherwise>
        <table border="1">
        <tr>
            <td>INDEX</td>
            <td>TIME</td>
            <td>FROM</td>
            <td>COMMENT</td>
        </tr>
        <c:forEach items="${comments}" var="comment" varStatus="status">
        <tr valign="top">
            <td>${status.index}</td>
            <td>${comment.ts}</td>
            <td>${comment.fromUserIp}</td>
            <%-- The c:out will escape html/xml characters. --%>
            <td><pre><c:out value="${comment.text}"/></pre></td>
        </tr>
        </c:forEach>
        </table>
    </c:otherwise>
    </c:choose>

Pretty standard stuff on JSTL. Next is the HTML form to post comment in `src/main/webapp/comment.jsp` file.

    <form action="comment" method="POST">
    <textarea name="commentText" rows="20" cols="80"></textarea>
    <br/>
    <input type="submit" value="Post"/>
    </form>

When form is posted and processed successful, we simply return to a new page in `src/main/webapp/comment-posted.jsp` file as output.

    <p>Your comment has been posted. Comment ID=${comment.id}</p>

If you've done these right, you should able to run `mvn tomcat7:run` and browse `http://localhost:8080/spring-web-annotation/comment` to see the form. Go to `/comments` URL to verify all the comments posted.

Note that despite I used Spring Controller as backend, all the views are in basic JSTL, and even the form are just basic HTML elements! I did this so you can see how flexible Spring Controller can be.

I know these are lot of code to post as a blog article today, but I wanted to be complete and try to show a  working demo with tutorial notes. I choose to make it into a single post with file content instead of having you download a project somewhere else. It makes my notes and explanation easier to match onto the code.

And that will conclude our tutorial for today. Please leave a note if you find this helpful.

