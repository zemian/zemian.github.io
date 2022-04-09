# Zemian's Blog

This is a [11ty](https://www.11ty.dev/) static site generator project that
generate http://zemian.github.io site.

## Setup

See https://www.11ty.dev/docs/getting-started/

  npm install

Folder structure:

  src/content - Markdown files that generate content
  src/templates - Nunchucks template files
  src/static - Static files to be copy into public web server

## Writing Blog

First start dev server

  npx @11ty/eleventy --serve
  open http://localhost:8000/

Add new post in `src/posts` folder.

## Publishing site

## ZBlog Logo

* https://danmarshall.github.io/google-font-to-svg-path/
  * Size: 50
* https://fonts.google.com/?preview.text=ZBlog&preview.text_type=custom&category=Handwriting

## Google Search Engine for "Zemian's Blog"

https://programmablesearchengine.google.com/cse/setup/basic?cx=5bfbcfd67681f7be8

## Cleanup posts

We should move these into posts folder
```
src/static/posts-images
src/static/posts-images/2014
src/static/posts-images/2014/wls-datasource.png
src/static/posts-images/2014/visualvm.png
src/static/posts-images/2014/wls-datasource-jdbcstore.png
src/static/posts-images/2014/wls-analysis-tool.png
src/static/posts-images/2014/wls-shared-lib.png
src/static/posts-images/2021
src/static/posts-images/2021/new-zblog-design-with-bulma-and-sculpin.png
src/static/posts-images/2020
src/static/posts-images/2020/blog-vuepress.png
src/static/posts-images/2020/blog-jbake.png
src/static/posts-images/2020/ojet-starter.png
src/static/posts-images/2020/marknotes1.png
src/static/posts-images/2020/marknotes3.png
src/static/posts-images/2020/marknotes2.png
src/static/posts-images/2020/bulma2.png
src/static/posts-images/2020/bulma3.png
src/static/posts-images/2020/bulma1.png
```