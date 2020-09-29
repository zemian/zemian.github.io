---
title: JS Object To JSON Converter
date: 2020-04-19T00:00:00-05:00
tags:
  - js
  - json
---

A well formed JSON string can be an JS Object, but not the other way around due to JS allow you to use keys without quotes, or use single quotes.

Example:

| JS Object Literal | JSON |
| ------------- | ------------- |
| ```{foo: 'bar'}```  | ```{"foo": "bar"}```  |

Here is a simple HTML that can convert a JS object literal into JSON string:

<<< @/blog/.vuepress/public/apps/js-to-json.html

<!-- Due to VuePress is a single page app, this link needs to be external to work! -->
You can run it <a href="/apps/js-to-json.html" target="_blank">here</a>
