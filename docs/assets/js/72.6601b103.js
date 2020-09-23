(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{454:function(e,t,n){"use strict";n.r(t);var o=n(10),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("On the next coming MySchedule release, I've been working on removing few dependencies in the project to improve its size, but yet still keeping all the original functionality.")]),e._v(" "),n("p",[e._v("The "),n("a",{attrs:{href:"http://code.google.com/p/myschedule/downloads/list",target:"_blank",rel:"noopener noreferrer"}},[e._v("result"),n("OutboundLink")],1),e._v(" is about 70% reduction in war file size!")]),e._v(" "),n("p",[e._v("There are few things that I removed that resulted in a much smaller webapp.")]),e._v(" "),n("ol",[n("li",[n("p",[e._v("Removed MySQL jdbc driver. Not every one uses Quartz with this DB, so including it in distribution is not necessary. You can easily add it into a server classpath without modifying the war.")])]),e._v(" "),n("li",[n("p",[e._v("Removed Groovy. I've improved the UI and the ScriptingJob component so that it works with any Java standard script engine. The JDK comes with JavaScript engine built-in! So now Groovy can be optional, and yet user can still use it by simply add it to the server classpath, and they can select the language in MySchedule UI. Without it, MySchedule will just default to JavaScript for scripting.")])]),e._v(" "),n("li",[n("p",[e._v("Removed Spring (MVC) Framework. Now this is a big task because MySchedule uses Spring annotations, controllers and service beans in IoC config to bootstrap the entire webapp. I've replaced it with a simple static "),n("a",{attrs:{href:"http://code.google.com/p/myschedule/source/browse/myschedule-web/src/main/java/myschedule/web/AppConfig.java",target:"_blank",rel:"noopener noreferrer"}},[e._v("AppConfig"),n("OutboundLink")],1),e._v(" that wired my services together, and then used the plain Servlet API to process all http requests.")])])]),e._v(" "),n("p",[e._v("So why remove Spring? Don't get me wrong, I like working with Spring, and I think it's awesome framework. I have been working with Spring based projects for a long time, and I even have my own set of "),n("a",{attrs:{href:"http://code.google.com/p/zemiandeng/source/browse/springmvc-project-template",target:"_blank",rel:"noopener noreferrer"}},[e._v("SpringMVC template"),n("OutboundLink")],1),e._v(" to\nstart any web application quickly. I know where things are configured and where to add new code to make a Spring app works, and it's flexibility are fantastic for development, especially for larger projects.  But in MySchedule case, it is just a small webapp that has it's focus is on Quartz. I wanted to remove Spring to create less confusion for any one who want to look at the code. The Spring bundled with Quartz in its core, and I want to avoid (I didn't use any of that any way.) I also want to shrink the war file size. And lastly, just to challenge of myself that, yes there is life outside of Spring, and it still can be maintainable. 😛")]),e._v(" "),n("p",[e._v("So in replacing Spring, but kept very much of same coding style, I have created my tiny little web request processing library. It only has few classes, and it will allow me to use single Servlet controller to map and process all URL actions through many smaller unit of code, which I called action handler. Now MySchedule can be easily configured through one "),n("a",{attrs:{href:"http://code.google.com/p/myschedule/source/browse/myschedule-web/src/main/java/myschedule/web/servlet/app/MainServlet.java",target:"_blank",rel:"noopener noreferrer"}},[e._v("MainServlet"),n("OutboundLink")],1),e._v("class. Not bad!")])])}),[],!1,null,null,null);t.default=a.exports}}]);