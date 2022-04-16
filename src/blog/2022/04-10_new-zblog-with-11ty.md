---
title: New ZBlog with Eleventy
date: 2022-04-10
tags: [11ty, ssg, bulmacss]
---

I changed to another Static Site Generator (SSG) called [Eleventy (or 11ty)](https://www.11ty.dev/) to create [my blog](https://github.com/zemian/zemian.github.io/tree/11ty) (It is in the current master branch as well). I kept my previous BulmaCSS theme I made though, so the looks is still about the same.

Few things I like about 11ty:

* It has the minimal (in fact zero config) to get started! Give a Markdown file and it
  will genearate you a output!
* It allow you to structure your data/project in any way you like. But they do have some
  default naming conventions if you choose to use it.
* It supports Data Cascade to allow many ways to provide Data. For example, I can easily add a  static JSON file and use it in my template!
* It supports many template libraries. It default to `Liquid`, but I prefer `Nunjucks` template
  library better, since it resemble `Twig` more and I like that syntax better.
* It has simple and overridable `layout` that you can use, even if you don't choose a fany template.
* It supports pagination and data collection (tags). I even able to have fine control over on `permalink` on how paginated files are generated and structured.
* It seems to be pretty fast. I have about 300 articles and it generated under 0.5 seconds!

Things I struggled a bit to get started:

* Their documentation is not very beginer friendly. I am not sure how to begin even after I read through few sections. I later found this [Learn Eleventy From Scratch](https://learneleventyfromscratch.com/) provides a excellent tutorial to get started!
* Switching to `Nunjucks` has thrown me off when seeking for documentation help. In the documentation, it often use `Liquid` syntax, and they might look the same to `Nunjucks`, but does not work the same. Especially when dealing with `permalinks` frontmatter since it allows template code there.
* The `Nunjucks` [is really spelled that way!](https://mozilla.github.io/nunjucks/) Don't try to correct it.
* The `Nunjucks` does not support `date` filter by default! You have to use an extra plugin!
* 11ty supports many templates, and I was suprised that I dont have to explicitly add it to the `package.json` dependencies explicitly!

Compare to VuePress:

* The VuePress default is gear toward for Documentation site, and it is strict on structure
  and the data source it can use to generate the site.
* It goes through this complex JS Hydration process that I just don't feel comfortable. It's like there things you just don't get to see behind the scene magic going on.
* When you make a simple article change, it regenerate lots of files, including JS file. It feels little weird.
