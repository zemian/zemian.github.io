## About this project

Hi, this is my personal blog site source repository.

My blog site is on https://zemian.github.io/

The site is generated using [VuePress](https://vuepress.vuejs.org/), and it is hosted by 
[GitHub Pages](https://docs.github.com/en/github/working-with-github-pages) service.

## How to write a new post

Write a new file under `blog/_posts` like this

```
---
title: Blog Title
date: 2020-01-01
tags: 
  - blog
---

My blog content goes here.
```

Then preview it:
	
	npm install
	npm run dev
	open http://localhost:8080

## How to build and publish site manually

Checkout `gh-pages` branch. This is the branch used to publish files.

```
git checkout gh-pages
npm run build-gh-pages
git add .
git commit -m 'Publish site manually'
git push
```

## How to build and publish site automatically using Travis CI

1. Add `.travis.yml` file in master branch and configure it to deploy using the 
   `pages` provider
2. Setup Account in https://travis-ci.com/
3. Go to github.com and create a GitHub token by going to user settings:
	   `Developer settings > Personal Access Token` (See https://github.com/settings/tokens)
	   NOTE: The token only displays once, so ensure to copy it
4. Go to travis-ci.com and add `GITHUB_TOKEN` environment variable under the project 
   with the Github token value copied in previous step.
5. Now trigger a test build.

From this point forward, any commits pushed to master will auto trigger a build and all 
the output under `docs` folder will be copy to `gh-pages` branch, commit and push 
from Travis CI.

See https://travis-ci.com/github/zemian/zemian.github.io
