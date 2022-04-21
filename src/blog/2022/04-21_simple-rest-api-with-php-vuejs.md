---
title: Create Simple REST API with PHP and VueJS
date: 2022-04-21
tags: [php, vuejs, rest-api]
---

One of the nice thing about PHP is that it is very easy to create web application, including REST API services. Here I will provide a very simple structure that can give you a REST API backend service and use VueJS to create a Client to test it.

We will use plain `PHP` and simple VueJS UI, so there is literally nothing to setup for project wise, other than just a folder and couple of source files:

```bash
mkdir -p my-rest-api/api
touch my-rest-api/api/index.php
touch my-rest-api/index.html
php -S localhost:3000
open http://localhost:3000/
```

Here is the [`my-rest-api/api/index.php` file](https://github.com/zemian/my-rest-api/blob/main/api/index.php), and the [`my-rest-api/index.html` file](https://github.com/zemian/my-rest-api/blob/main/index.html). Both combined to about 100 lines of code!

The reason I use `api/index.php` is so that we get a nice URL that can ends with `http://localhost:3000/api/` and it will work. The API service itself is just returning a result from PHP's `preg_match()` function. I also added `OPTIONS` support, and allow `CORS` from any host so it's easy for testing.

On the client side, I use VueJS Option API to create a simple form to test the API. It demonstrate how easy it is to sprinkle some Vue into your application. And at last I added BulmaCSS to make the form pretty.

As you can see that it is so simple and easy to setup. You can use this to quickly host a mocked API and or use it to test
some of you fancy JS client. Happy coding!
