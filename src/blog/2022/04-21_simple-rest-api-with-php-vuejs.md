---
title: Create Simple REST API with PHP and VueJS
date: 2022-04-21
tags: [php, vuejs, rest-api]
---

One of the nice thing about `PHP` is that it is very easy to create web applications, including REST API services. Here I will provide a very simple structure that can give you a REST API backend service and use VueJS to create a Client to test it.

We will use plain `PHP` and simple VueJS UI without any additional frameworks. There is literally nothing to setup for project wise, other than just a folder and couple of source files:

```bash
mkdir -p my-rest-api/api
touch my-rest-api/api/index.php
touch my-rest-api/index.html
php -S localhost:3000
open http://localhost:3000/
```

The reason I use a folder for `api/index.php` is so that we get a nice URL that can ends with nice path (eg: `http://localhost:3000/api/`). Just for demo purpose, I made the API service returns a simple result from a `preg_match()` function. I also added RESTful `OPTIONS` support, and allow `CORS` from any host, so it's easy for testing from any client connections.

I use `index.html` on the client UI side, which is the default page of the host. I use simple VueJS Option API to create a form and `fetch()` to interact with the API. This demonstrates how easy it is to sprinkle some JS logic into your web page. And finally, I added BulmaCSS to lights up the form and makes it pretty.

This simple, bare to the bone `PHP` setup let you create a quick API that is good for mock test or explore any backend features quickly. To help you try it out, I've created a [Git repository template](https://github.com/zemian/my-rest-api) that you can quickly give it a go. Also, for completeness sake, I will repaste couple of the file contents here:

File: `api/index.php`

```
<?php
/*
 * A simple REST API that will match a Regular Expression to an Input Text and return the result.
 *
 * Author: Zemian Deng <zemiandeng@gmail.com>
 * Date: April 21, 2022
 */

function match_regex($regex, $input) {
    $matches = [];
    preg_match($regex, $input, $matches);
    return $matches;
}

// Allow any service to make pre-flight requests to this REST API
$allow_methods = "OPTIONS, GET, POST";
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: ' . $allow_methods);

// Main script request processing starts there
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 NO CONTENT");
    header('Allow: ' . $allow_methods);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $request_data = json_decode($body, true);
    $match_result = match_regex($request_data['regex'], $request_data['text']);
    echo json_encode($match_result);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = ["status" => "API Service is working!", "timestamp" => date('c')];
    echo json_encode($data);
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header('Allow: ' . $allow_methods);
}
```

File: `index.html`

```
<!doctype html>
<!--
    Author: Zemian Deng <zemiandeng@gmail.com>
    Date: April 21, 2022
-->
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>A Simple REST API Client</title>
    <link href="https://unpkg.com/bulma@0.9.3/css/bulma.min.css" rel="stylesheet">
    <script src="https://unpkg.com/vue@3.2.33/dist/vue.global.prod.js"></script>
</head>
<body>

<div id="app" class="section">
    <div class="container">
        <h1 class="title">A Simple REST API Client</h1>

        <div class="field">
            <div class="control">
                <label class="label">Regular Expression</label>
                <input class="input" v-model="regex"></textarea>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Input Text</label>
                <textarea class="textarea" v-model="inputText"></textarea>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input class="button" type="submit" @click="onSubmit">
            </div>
        </div>

        <div>
            <pre v-if="response">{{JSON.stringify(response, null, 2)}}</pre>
            <div v-if="response && response.newtext">
                <h1 class="is-size-5 has-text-weight-bold">Rendered Text</h1>
                <div v-html="response.newtext"></div>
            </div>
        </div>
    </div>
</div>
<script>
    Vue.createApp({
        data() {
            return {
                regex: '/(foo)(bar)(baz)/',
                inputText: 'foobarbaz',
                response: null,
                baseUrl: 'api/',
            };
        },
        methods: {
            onSubmit() {
                const data = JSON.stringify({regex: this.regex, text: this.inputText});
                console.log("Sending request to " + this.baseUrl);
                fetch(this.baseUrl, {method: 'POST', body: data})
                    .then(resp => resp.json()).then(data => {
                    console.log("Received data", data);
                    this.response = data;
                });
            }
        }
    }).mount('#app');
</script>

</body>
</html>
```

