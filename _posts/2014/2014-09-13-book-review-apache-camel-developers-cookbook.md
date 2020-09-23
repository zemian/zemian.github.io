---
title: Book Review - Apache Camel Developer's Cookbook
date: 2014-09-13T00:00:00-05:00
tags:
  - bookreview
  - camel
---

I got a chance to review the "[Apache CamelDeveloper's Cookbook](https://www.packtpub.com/application-development/apache-camel-developers-cookbook)" by Cranton and Korab. Overall I think this is a
great book. System integration problems and solutions come in many forms, so
getting started by reading on some proven solution recipes is definitely a good
way to improve your skill. This book provides more than 100 examples on how to
solve integration problems with Camel framework; from simple standalone Java
application to testing, transaction, monitoring and even a chapter on web
services. Each example comes with brief explanations and further reading
references. My favorites are the side notes sprinkled throughout each recipe.
Clearly these great tips can only have came from well experienced Camel
developers who has spent time on the field. 

As many cookbook style, the book can only go to certain length with each example
on explanation and teaching, but readers may dig much deeper by using the
sample code provided by this book. In fact I think it's really cool that it's available
through GitHub as well. Check it out at [http://github.com/CamelCookbook/camel-cookbook-examples](http://github.com/CamelCookbook/camel-cookbook-examples).
(although I think there is a typo in the book for this URL on the copy I have!
^_^) The sample code are complete, clean and easy to follow for each recipe
example. The source code is in Maven based project, so you will get all the
dependencies needed by just running the "install" phase. Open by any
major IDE and you will start reading and compiling immediately. Because it's
using Maven, you can also download the Camel dependencies with Source, and you
can jump right into the framework code itself to analyze what's behind this
cool project.

Because it's a cookbook, it does not go into too deep about Camel internal. But
through the examples, many of the core concepts of Camel has been touched; and
it serves as a great example and can be used as handy reference book. Because
it covers the Camel concept briefly, it expected you to know little bit of the
integration knowledge and background though. Things like Enterprise Integration
Patterns and transport technologies used such as File, FTP, SEDA, JMS etc. The
book also comes with many Spring based XML configuration examples, and it
expects you to know some basic knowledge of bean configuration. But the xml
configuration of Camel routes itself are very self explanatory, so readers should able to follow along easily.

If you work with Camel project, or have to start an integration project, I
would recommend you to check out this book.
