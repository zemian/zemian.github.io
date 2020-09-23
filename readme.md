This repository contains files to generate https://zemian.github.io/ site.

The site is hosted by [GitHub Pages](https://docs.github.com/en/github/working-with-github-pages) service using the `gh-pages` branch.

## How to write a new post

Write a new file under `blog/_posts` like this

```
---
title: Blog Title
date: 2020-01-01
tags: 
  - blog
---

My blog content.

```

Then preview it:
	
	npm install
	npm run dev

## How to build it

Clone another another copy this repository under `temp` folder, and checkout `gh-pages` branch. This is that we can publish files under the `docs` folder.

	git clone -b gh-pages git@github.com:zemian/zemian.github.io.git temp/zemian.github.io_gh-pages
	npm run build

## Todo

* How to exclude folder from build?
* Can I add images in the `_posts` directory?
* Add next/prev link on blog Post?
* Add RSS to blog?
* Add user comments (disqus or simply GitHub issues) to blog?
* Add vuepress-plugin-container support to blog?
* Can we disable server side SSR generation step during build?
* Does a build always need to update so many files in output directory?
