---
title: Adding a Prefix to BulmaCSS Classes
date: 2022-02-01
tags: [css, bulmacss, postcss, wordpress]
---

I love using [BulmaCSS](https://bulma.io/) for styling web pages. It's easy to use and has great selection of built-in components ready create most common web pages. Simple customization can be done by overriding Sass variables only. But if you ever needed fine control on customization and add your own UI components, drop down to their open source Sass scripts to add what you need. It provides only CSS layer, and does not lock you in to any JS code, and this makes integration to any project easy! It's just a awesome little CSS library that's joy to use.

I have used BulmaCSS to create a WordPress theme easily and it looks great! Now when creating WordPress theme, we are allow to use any CSS framework and so using BulmaCSS is simple to do. But if you wanted to use Bulma to extends and add custom WordPress Admin Pages however, then you will encounter issues. Since WordPress Admin pages already has their own set of custom CSS loaded, many CSS class names are in conflict with BulmaCSS names. Unfortunately BulmaCSS build script does not provide you a way to automatically prefix a string in front of all their classes, which is what we need to solve this problem.

Someone already reported such [issue in BulmaCSS project](https://github.com/jgthms/bulma/issues/302), but unfortunately the project owner decided to close the issue with the following comment:

>jgthms commented on Sep 12, 2016
>
>I understand the idea, but most people only use a single css framework. I guess you could import the sass files you want, and wrap that inside a new class, and use &- to namespace.
>
>Or you could use CSS modules.
>
>But renaming everything would bring a lot of noise, and I believe most users don't want that noise.

Based on other people comments, I have come up with the following solution to above: Use the [`postcss` tool](https://postcss.org/) to add prefix name to all CSS classes! Here is a GitHub project I made: [zemian/bulma-prefix](https://github.com/zemian/bulma-prefix). Here is a [build result](https://github.com/zemian/bulma-prefix/tree/main/build) based on BulmaCSS version `0.9.3`. The prefix name I choose is `bu-`. And here is an example code to use it:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My custom Bulma website</title>
    <link rel="stylesheet" href="../build/bu-bulma.css">
</head>
<body class="bu-section bu-container">
<h1 class="bu-title">
    Bulma
</h1>

<p class="bu-subtitle">
    Modern CSS framework based on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">Flexbox</a>
</p>

<div class="bu-field">
    <div class="bu-control">
        <input class="bu-input" type="text" placeholder="Input">
    </div>
</div>

<div class="bu-field">
    <p class="bu-control">
          <span class="bu-select">
            <select>
              <option>Select dropdown</option>
            </select>
          </span>
    </p>
</div>

<div class="bu-buttons">
    <a class="bu-button bu-is-primary">Primary</a>
    <a class="bu-button bu-is-link">Link</a>
</div>
</body>
</html>
```

Ase you can see, we can now use `bu-` prefix to all Bulma classes. This allowed me to add WordPress custom Admin pages with BulmaCSS styling with ease!
