(window.webpackJsonp=window.webpackJsonp||[]).push([[297],{679:function(e,t,o){"use strict";o.r(t);var a=o(10),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("p",[e._v("I have gotten into PHP lately in order to help a friend who runs a Joomla site with a custom component. Thinking to myself now that I have some "),o("a",{attrs:{href:"/2020/03/22/front-end"}},[e._v("Front End Experience")]),e._v(", I shouldn't have trouble doing this. But I have never seriuosly got into PHP in the past though, and now I need to learn enough to debug and fix few bugs in the Joomla env. I have gathered and learned quite a few things and like to write it down.")]),e._v(" "),o("h2",{attrs:{id:"learning-php"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#learning-php"}},[e._v("#")]),e._v(" Learning PHP")]),e._v(" "),o("p",[e._v("I started "),o("a",{attrs:{href:"https://github.com/zemian/learn-php",target:"_blank",rel:"noopener noreferrer"}},[e._v("Learn PHP"),o("OutboundLink")],1),e._v(" repository to familiar with PHP first. I want to setup PHP locally in my machine so I can learn some syntax and programming construct. I was suprised their documentation is pretty good. I even watched a old video on "),o("a",{attrs:{href:"https://www.youtube.com/watch?v=rKXFgWP-2xQ",target:"_blank",rel:"noopener noreferrer"}},[e._v("PHP in 2018 by the Creator of PHP"),o("OutboundLink")],1),e._v(" by Rasmus Lerdorf. It was very informative and encouraging to see PHP is still thriving and doing good.")]),e._v(" "),o("p",[e._v("PHP is not much use without a database and a web server, so I learned how to setup and connect PHP to those two. It seems PHP loves MySQL, and getting that running is pretty easy. As far as web server, there are few major ones to choose: Apache Httpd, Nginx or Lighttpd. The Lighttpd is the easiest to setup. I like it how I can just use one config file and bring up the server in foreground process, and the DocumentRoot can be set to your CWD. No need to setup any background PHP daemon process (like Nginx requires one). Apache Httpd can also start without a PHP daemon but the setup is complicated. Then later I learned that PHP itself comes with a web server for development! Just run "),o("code",[e._v("php -S localhost:3000")]),e._v(" and it serves your current working directory. No setup needed! Sweet!")]),e._v(" "),o("p",[e._v("NOTE: For production, it's recommended to use either Apache Httpd or Nginx.")]),e._v(" "),o("p",[e._v("Later, I also found there are different versions of PHP that I would need to fix the site, and settting up multiple versions of PHP in a single web server is pretty complicated. I gathered a lot of notes on each of these subject in my repository, so check it out.")]),e._v(" "),o("h2",{attrs:{id:"learning-joomla"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#learning-joomla"}},[e._v("#")]),e._v(" Learning Joomla")]),e._v(" "),o("p",[e._v("My goal is to help my friend's site, so next I started "),o("a",{attrs:{href:"https://github.com/zemian/learn-joomla",target:"_blank",rel:"noopener noreferrer"}},[e._v("Learn Joomla"),o("OutboundLink")],1),e._v(" project. My friend site is actually quite old (Joomla 3.5.1 with PHP 5.6 and MySQL 5.7). Because of this and the PHP was compiled with some special extension in server, I actually had hard time setting it up in my Mac for local development. I ended up had to compile my own PHP from source to get a setup working! It was a painful exercise since compiling PHP 5.6 on latest MacOS has many hiccups.")]),e._v(" "),o("p",[e._v("Once the environment is up, installing Joomla itself is not too bad. I got it up running in short time. Joomla documentation site is only so so though. I think this CMS design is overly complex. Their concept of Menus, Articles and Extensions are confusing, feel bulky and a lot to learn. A simple MVC based component extension will take over 10+ files to write! I just want to learn enough to use it to support a site, not experts, so this repository have gotten me through what I need to know about Joomla.")]),e._v(" "),o("p",[e._v('One interesting I learned about Joomla is that its "System Debug" feature is pretty good. When enabled, it shows a "Debug Console" footer in your site that shows session, request, SQL queries and application debug messages. Great tool to debug the application. (If your site or component uses their full MVC model that is.)')]),e._v(" "),o("h2",{attrs:{id:"fixing-a-php-application"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#fixing-a-php-application"}},[e._v("#")]),e._v(" Fixing a PHP application")]),e._v(" "),o("p",[e._v("When I got into my friend's site, I had a pretty good idea about the PHP env. So I thought I was pretty prepared. Boy, I was wrong! The site has a custom component that started out as nice self-contained extension. But through many years of abuse, it is now old with many unmaintained dependencies. It has many developers touched it over the years without any consistency. The code was badly formatted (PHP mixed with HTML in the worse way you can think of), files scattered everywhere, and worse of it all there are lots of repeated codes. Through all these, there were no version control used. So dead code eveywhere, and backup unused files literred all over the place. This is a one big mess of an app.")]),e._v(" "),o("p",[e._v("Prowling through large, new code base is a daunting task. I've found the JetBrains' PHPStorm IDE helps a little bit there. I was able to jump functions and searching in directory is a breeze. The IDE also supports PHP debugger, but unfortunately it only works with latest PHP7 well. The PHP 5.6 is harder to get it setup that in the end I gave up.")]),e._v(" "),o("p",[e._v("Without a debugger, the next resort in debugging an app is print message as you trace through code. The PHP is notoriously easy to allow developers litter code with "),o("code",[e._v("echo")]),e._v(" lines and then comment it out after debug. The Joomla actually has a nice "),o("code",[e._v("JLog")]),e._v(" logging function that let you dynamically turns on/off and to file output. But this application that I am supporting didn't use that, and there is zero log message. I also learned that logging to file is essential when tracing a AJAX supported PHP code. Here you can't simply "),o("code",[e._v("echo")]),e._v(" your debug message out, or it will break the JSON payload. So I have to write some of these debugging code to help myself to troubleshoot the application.")]),e._v(" "),o("p",[e._v("At the end, I was able to fix few of the pressing issues due to their multiple version of jQuery loading conflicts and some bad SQL in their dynamic query builder. I have to say that nothing teaches you more than jumping into a badly coded site that's somehow working, and yet you need to fix few naughty issues! It's a hair pulling experience, but I learned a lot.")])])}),[],!1,null,null,null);t.default=n.exports}}]);