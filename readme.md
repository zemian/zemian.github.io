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

Clone another copy this repository with `gh-pages` branch checkout first, then generate the output there:

	cd workspace
	git clone git@github.com:zemian/zemian.github.io.git
	git clone -b gh-pages git@github.com:zemian/zemian.github.io.git zemian.github.io_gh-pages
	cd zemian.github.io
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
