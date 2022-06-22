# Zemian's Blog

This is a [11ty](https://www.11ty.dev/) static site generator project that
generate [ZBlog](http://zemian.github.io) site.

## Setup

See https://www.11ty.dev/docs/getting-started/

```
npm install
```

Folder structure:

```
src - Source of various contents
src/blog - Blog posts content in Markdown format.
src/_includes - Templates and layouts in Nunjucks format.
static - Static files to be copied into output as pass-through.
```

## Writing Blog

First start dev server

```
npm run dev
open http://localhost:8080/
```

Add new Markdown file under `src/blog/<year>` folder. Use `<MM-DD>_<slugify-title>` as filename
format. When generating output, the filename is not used though. It uses the FrontMatter with `title` and
`date` as minimal variables.

See https://www.markdownguide.org/ more on how to create Markdown files.

NOTE: Do not use `blog` values for `tags`, because it is used as special filter for generating blog posts.

## Publish site using GitHub Action

Add `.github/workflows/gh-pages.yml` to automatically build and publish `.site` folder into `gh-pages` branch!

Just commit and push using Git will auto update the site!

## Publishing site Manually

```
npm run build
```

The output of the site is in `_site` folder. Just copy it into any web server to deploy it.

## ZBlog Logo

* https://danmarshall.github.io/google-font-to-svg-path/
  * Size: 50
* https://fonts.google.com/?preview.text=ZBlog&preview.text_type=custom&category=Handwriting

## Favicon

https://favicon.io/emoji-favicons/smiling-face-with-sunglasses

## How to create large textblock with Nunjucks template

```
{% verbatim %}
...
{% endverbatim %}
```

## How to add an embedded image (screenshot) in article

```
![](/posts-images/2022/06-20_vuejs-google-map.png)
```