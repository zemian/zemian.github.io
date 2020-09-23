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

## How to build and publish site manually

Clone another another copy this repository under `temp` folder, and checkout `gh-pages` branch. This is the branch we publish files.

	git clone -b gh-pages git@github.com:zemian/zemian.github.io.git temp/zemian.github.io_gh-pages
	npm run build-gh-pages
	cd temp/zemian.github.io_gh-pages
	git add .
	git commit -m 'Publish site manually'
	git push

## How to build and publish site using Travis

1. Add `.travis.yml` file in master branch and configure it to deploy using a `pages` provider
1. Setup Account in https://travis-ci.com/
1. Go to github.com and create a GitHub token by going to user settings: "Personal Access Token"
	NOTE: It only display onces, so ensure to copy it
1. Go to travis-ci.com and Add `GITHUB_TOKEN` environment variable under the project with the value copied.
1. Trigger a build

From this point forward, any commits pushed to master will auto trigger build and all the output under `docs` folder will be copy to `gh-pages` branch, commit and push form Travis.
