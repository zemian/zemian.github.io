---
title: Switched Blogging to VuePress
date: 2020-08-15T00:00:00-05:00
tags:
- blog
- vuepress
---

I have switched my blog publishing source from [jbake](https://github.com/zemian/zemian.github.io/tree/jbake) to [vuepress](https://github.com/zemian/zemian.github.io/tree/master).

When I started with `jbake`, I used `asccidoc` format for post content, then I come to learn that Markdown is much easier to write for my need. I usually just need to write few lines of thoughts and code examples. Markdown suited me just fine. I also have been learning and using `JavaScript` development a lot lately, so I decided to use a JS based site generator. I spent some time learning [VuePress](https://github.com/zemian/cms-eval/tree/master/learn-vuepress) and find it very promising, so I decided to switch. 

To switch to it, I had to convert my `asciidoc` posts into Markdown format, and then I have to take care of the frontmatter metadata keys. Another area I needed was to move the posts files into different folders for better file organization. Then I also took the chance to cleanup many bad posts formatting along the way.

Recently I also have been teaching my son, Kenny, on learning `JavaScript` programming, and I thought this is perfect chance to put some of his learning in to practical use. He actually helped me convert all the post files by writing some [utility scripts](https://github.com/zemian/zemian.github.io/pull/2). He also got to use GitHub and Pull Request the for the first time!

Thanks to Kenny, here we have a before and after blog screenshots!

Before - Blog with JBake:
![](/build/images/posts/2020/blog-jbake.png "Before - Blog with JBake")

After - Blog with VuePress:
![](/build/images/posts/2020/blog-vuepress.png "After - Blog with VuePress")
