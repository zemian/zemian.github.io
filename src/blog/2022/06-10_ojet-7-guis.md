---
title: 7 GUI Tasks With Oracle JET  
date: 2022-06-10
tags: [ojet, 7-gui, reactjs, preactjs, vdom]
---

![](/posts-images/2022/06-10_ojet-7-guis.png)

I have implemented the [7 GUI Tasks](https://eugenkiss.github.io/7guis/) using 
[Oracle JET](https://www.oracle.com/webfolder/technetwork/jet/index.html) UI library. Checkout the [live demo](https://rococo-tanuki-521a94.netlify.app/), and the [source code](https://github.com/zemian/ojet-7-gui) at GitHub.

I learned quite of few things through this project:

* Older JET uses [KnockoutJS](https://knockoutjs.com/) as a MMVM based binding provider. Starting version 12, it starts to support additional VDOM (Virtual DOM) and it uses [PreactJS](https://preactjs.com/) as the binding provider. This lets you build [ReactJS](https://reactjs.org/) type of UI application, and leverage the large set of UI components that JET has.
* I discovered the 7 GUI Tasks when browsing the [VueJS Examples](https://vuejs.org/examples/), and thought it would be a great opportunities to try out JET 12 with PreactJS implementation and JET UI components.
* Using Preact is pretty much like ReacJS. In fact for learning purpose, the ReactJS might provide better and more details tutorial. Once you are familiar this how to build general ReactJS app, then you can just apply the concept to reuse the JET components as web components.
* Preact is really lightweight compare to React, and it's very nice to that Preact supports native DOM events and class attributes, no need to wrap it. 
* Using JET specific library comes with some surprises. For example, their DataProvider needs to be cached in Function component, so that we don't re-initialize on every re-render. Also sometimes you would even need to check whether an event is from "internal" or "external" to avoid duplicated update call due to re-render function.
* Using Preact style in JET application really makes things more simple and smaller. Each JET component now can be as small as a function, and no need to carry separate CSS, ViewModel, View and even the JSON metadata file. The JSON metata file is now optional and can be generated automatically.
* I deployed the demo at [Netlify](https://www.netlify.com/) with their free app and deployment tool. It's super easy to use and it works great!

