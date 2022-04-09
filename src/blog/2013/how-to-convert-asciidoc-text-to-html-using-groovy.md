---
title: How to convert asciidoc text to html using Groovy
date: 2013-08-17T00:00:00-05:00
tags:
  - groovy
---

Here is how you can convert `asciidoc` text using Groovy script:

    // filename: RunAsciidoc.groovy
    @Grab('org.asciidoctor:asciidoctor-java-integration:0.1.3')
    import org.asciidoctor.*
    def asciidoctor = Asciidoctor.Factory.create()
    def output = asciidoctor.renderFile(new File(args[0]),  [:])
    println(output);

Now you may run it

    groovy RunAsciidoc.groovy myarticle.txt

Many thanks to the `asciidoctor.org` project!
