Title: From Back End to Front End Development
Date: 2020-03-22 00:00:00-05:00
Tags: js,nodejs,frontend



A year ago I was given an opportunity to work on the Oracle CX Knowledge Management product. In this development team, we use Oracle JET (OJET), a JavaScript toolkit for building our UI application. The product also has a mature RESTFul API service that manage the content data from the back end.

In the past, I have been doing Java development for more than a decade, and have exposed to UI work when developing web applications. But my experience has always been doing UI with server side rendering technologies with Java. For example using Servlet MVC pattern and a template engine such as JSP or Freemarker. So switching to full time JavaScript (JS) UI is a shock to me and took some time to get used to.

Today the JS ecosystem is vast and changed a lot since when I first learned it. It’s no longer just a little script file (eg: jQuery) in a browser to enhance HTML anymore. Large JS application has promoted the language to support splitting code in modules (or using library such as RequireJS to manage it.) And the introduction of NodeJS has brought JS out of browser and running on local system with command line build tool such as Grunt and local Web Server possible. The NPM repository allow JS developers to share code much faster, so it’s hard to just keep up what’s new everyday. Today, a typical JS project will start as a NPM based project with Webpack build tool to build separated src folder that contains modularized html and js files to generate the web output folder. The project normally can setup a local web server that power by NodeJS so that we don’t even need to setup real Apache HTTPD web server during development! My goodness, it true JS all the way!

Now, Oracle also has their own JS framework and UI library called OJET that they have been using for a while now. The OJET is a UI components libraries built on top of KnockoutJS (KO). The KnockoutJS was very popular few years ago, but now it has slow down and replaced by other newer libraries such as VueJS. But despite that, KO is a very nice and easy to use library. It provides JS model objects binding to HTML dom tree elements. The model can have observables that will “react” to changes and automatically update the DOM elements (UI). This is the whole basis of what they call MVVM pattern. And the OJET application is built based on that.

I will try to write up some more updates, tips and tutorials on how to use OJET and other JS related topics here. So keep in touch!

