This repository contains code that generate https://zemian.github.io/ site

This project is a Static Site Generator powered by [jbake](https://jbake.org/)

## Setup 

Run `brew install jbake`

Note: The site is generated using version `2.6.4`

## How to write a new post

Write a new file under `content/blog` then run preview:

1. Run `jbake -b -s`
2. Open http://localhost:8820

## To build/update site

1. Run `jbake -b . site`
2. Git commit and push

### About the `site` folder

When we generate the site, the output is store in `site` folder. This repository
is a GitHub page repository and is directly served by https://zemian.github.io/ URL.
We have this readme perform a redirect to `site/index.html`

Note that the `site` folder is versioned!
