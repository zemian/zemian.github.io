Title: Getting started with Pelican
Date: 2022-03-26
Tags: python,blog,ssg

This blog is now using [Pelican](https://getpelican.com/) is a static site generator, written in Python.

## First time setup

	pip install pelican markdown

## How to use

To create article
	
	echo 'Hello' > content/hello.md

To preview

	pelican -r -l

To publish

	pelican -s publishconf.py
	rsync -avc --delete output/ host.example.com:/var/www/your-site/
