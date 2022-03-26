---
title: Which CMS to Use?
date: 2020-09-23
tags:
- cms
- blog
- knowledge-management
- site-development
---

What is a CMS? Accoridng to [Wikipedia](https://en.wikipedia.org/wiki/Content_management_system)

> A content management system (CMS) is a computer software used to manage the creation and modification of digital content. CMSs are typically used for enterprise content management (ECM) and web content management (WCM). ECM typically supports multiple users in a collaborative environment by integrating document management, digital asset management and record retention.

A CMS (or sometimes it can be called Knowledge Mangaement System, KMS) such as ECM can be very complex and requires a team of developers and a company to support it! In fact I am currently working for [Oracle CX Knowledge Management](https://www.oracle.com/cx/service/knowledge-management/) that provides such service.

Outside of ECM, many smaller business would use CMS (or the WCM) to create and host their own website. Now a days, a CMS can do more than just hosting static pages. It can be extended to include dynamic features such as ecommerce store that sells product or manage community of users etc. Another usage of CMS is just for personal blogging. It helps keep track and displaying someone's weblog in a form of digital Post.

I have [evaluated](https://github.com/zemian/cms-eval) and used quite of few CMS applications for my own personal blogging. Here I would highlight few that I like with their pros and cons. I hope these help you in selecting your own CMS to use.

## Static Site Generator

If you are a developer, you should definately try a "Static Site Generator" to generate a site. It helps you understand more on the tools and way to create site differently compare to a traditional web development with a server. Currently GitHub provide "Pages" services that host static html files for free.

There are many generator to choose from. See my `cms-eval` repo for details. Currently I found [VuePress](http://vuepress.vuejs.org/) to be very promising.

PROS:
* Generators are usually easy to setup and run using a dynamic scripting language.
* Content data are usually store as files. And it can use markup syntax such as Markdown or Asciidoc for input.
* Simple layout and template processing to generate output that usually use a certain folders structure. Minial configuration is needed.
* Site output is just plain static HTML/CSS/JavaScript files.
* No server side processing needed to host the site.
* No need database

CONS
* It's more work to create new post and publish it.
* New content data is created using your text editor locally, save, and then Git commit.
* New site needs to be generated, then push and update host server.
* You can automate publishing using CI server (like Travis) but require more setup.
* You usually want to use source control tool to version changes, so more tool to learn.
* A change in source could generate many changes in the output static files. (Specially if you use pagination).
* Dynamic feature such as search feature is more difficult to do. You usually need to integrate third party serice (eg: Disqus for user comments)

## Web based CMS applications

This usually mean you would use a CMS web application that made created using one of server side programming language. Some example of these applications are:

* WordPress (PHP)
* WagtailCMS (Python)
* RandiantCMS (Ruby)
* MagnoliaCMS (Java) 
* Gridsome(JS)

These CMS application setup usually require a database and server env that specific to that programming language.

PROS:
* Rich CMS features
* Take advantage of database storage and performance
* Scalable
* Customizable
* Full control on your own data and content

CONS:
* Learning curve is high
* Costly to host
* Need to maintain database and applications

## SAAS/Cloud based CMS

You can use one of cloud provider that provide CMS application that you do not need to host your own. Usually this type CMS can be full application, or headless API based that only provide backedn services, and then you build your own UI. 

Example are: ButterCMS  and ContentfulCMS.

PROS:
* Fast setup and usually all you need is a browser to get started (and a credit card. ^_^)
* No need to setup custom server, maintain database or applications

CONS:
* Costly
* Remote debugging and support
* Data and content are hosted remotely in vendor facility

## Custom site development

In this case you just build a web site from scratch using one of your favorite programming language.

* Java - scalable, high perforamance, higher learning curve, slower in development
* Python/PHP/Ruby/JavaScript - easy to learn and quick to develope

PROS:
* Fully customizable and take advantage of a programming language eco system.
* We can do just about anythig we can dream of!

CONS:
* Learning curve is higher compare to using an existing CMS application
* Costly to maintain
