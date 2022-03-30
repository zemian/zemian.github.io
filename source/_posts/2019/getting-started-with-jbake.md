---
title: Getting Started with jbake
date: 2019-01-15T00:00:00-05:00
tags:
  - blog
  - jbake
---

I started using <https://jbake.org/> for [my blog
site](https://zemian.github.io/) here at GitHub page. It’s a Java based
static site generator that has decent options. For Java developers, it’s
easy to learn and use. I can customize the site with Freemarker (and
other templates as well).

So far I am pretty happy with this.

Getting Started
===============

    mkdir hello-site
    cd hello-site
    jbake -i
    jbake -b -s

The `-b` option is for baking (generating) the content, and the `-s` is
to run a server for testing it. The default output of the site will be
in `output` folder. You can change it as `jbake -b -s . my-site-output`
