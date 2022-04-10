# Zemian's Blog

This is a [11ty](https://www.11ty.dev/) static site generator project that
generate http://zemian.github.io site.

## Setup

See https://www.11ty.dev/docs/getting-started/

  npm install

Folder structure:

  src - Source of various contents
  src/blog - Blog posts content in Markdown format.
  src/_includes - Templates and layouts in Nunjucks format.
  static - Static files to be copied into output as pass-through.

## Writing Blog

First start dev server

  npm run dev
  open http://localhost:8080/

Add new Markdown file under `src/blog/<year>` folder. Use `<MM-DD>_<slugify-title>` as filename
format. When generating output, the filename is not used though. It uses the FrontMatter with `title` and
`date` as minimal variables.

See https://www.markdownguide.org/ more on how to create Markdown files.

## Publishing site

  npm run build

The output of the site is in `docs` folder. We will commit this folder into Git so it can be published 
as GitHub Pages.

## ZBlog Logo

* https://danmarshall.github.io/google-font-to-svg-path/
  * Size: 50
* https://fonts.google.com/?preview.text=ZBlog&preview.text_type=custom&category=Handwriting

## Favicon

https://favicon.io/emoji-favicons/smiling-face-with-sunglasses

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