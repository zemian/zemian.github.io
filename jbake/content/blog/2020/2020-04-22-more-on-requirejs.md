---
title: Exploring More on RequireJS
date: 2020-04-22
tags:
  - requirejs
---

## Configuring RequireJS

You can use either `requirejs.config()` or `require.config()` to setup RequireJS. I preferred the `requirejs.config()` and `require()` to load modules just so to give them some distinction on usage. A typical config usage is like this:

```
requirejs.config({
    baseUrl: "js/",
    paths: {
        'foo': 'path/foo',
        'bar': 'path/bar',
    }
});
```

You can actually run `requirejs.config()` multiple times! Most of the options will be appended together. But the last `baseUrl` will override all.

## Use Shim for Library that has no AMD support

If you are loading a library (eg: CKEDITOR4), then you need to work with `shim` because it expose a global variable named CKEDITOR. Examples:

```
requirejs.config({
    paths: {
        ckeditor: 'https://cdn.jsdelivr.net/npm/ckeditor4@4.14.0/ckeditor'
    },
    shims: {
        ckeditor: {
            exports: 'CKEDITOR'
        }
    }
});
require(['ckeditor'], () => {
    // Notice that CKEDITOR variable is automatically available due to our shims' export.
    CKEDITOR.replace('editor', {width: '100%', height: '85%'});
});
```

## Writing Modules

It’s recommended you don’t explicitly name your module, but simply let your filename be the module name. Example:

```
//file: mymodule.js
define('mymodule', [], function() {
    return {
        uniqueId() {
            return Math.random().toString(16).substring(2);
        }
    }
});
```

You can create many internal functions and variable you want and they do need to be all returned (or exported). Another popular export data is simply the JS function constructor. Example:

```
//file: MyService.js
define(['mylib', function(mylib) {
  function MyService () {
    // ... define your service here.
    // note that 'mylib' is loaded and availabe to use here.
  }
  return MyService;
});require(['MyService'], (MyService) => {
  let service = new MyService();
  // Use service here...
});
```

## Loading Modules

You should know that when you use `require()` to load modules, they are all loaded asynchronously, and all the dependency are loaded accordingly in the proper order!

You can configure RequireJS with `paths` that setup hundreds of ready to use libraries, but if you don’t invoke `require()`, it will not be loaded into your browser at runtime!

The `require()` can be use anywhere in your HTML script code. One popular way to organize the code is that you place your application entry file (usually named `main.js`) with entry point of `require()` to start your application. Then you can load it in browser like this:

```
<script data-main="main" src="https://unpkg.com/requirejs@2.3.6/require.js"></script>
```

Note that `.js` is optional when you use `data-main` attribute. Above can also be loaded in your old fashion way like this:

```
<script src="https://unpkg.com/requirejs@2.3.6/require.js"></script>
<script src="main.js"></script>
```

## Troubleshooting Tips

1.  The usage and syntax of `require()` and `define()` is the same, so ensure you use the correct one! Using `define()` instead of `require()` will obviously fail your application, but the error might not be so straight forward.
2.  RequireJS loads modules in relative to the `baseUrl` path value setup in your config options. Ensure the value it’s loaded properly. Especially if you are using relative path. It default value is relative to the `.html` file where you include the `require.js` file in script tag. Triple check this if you see error not able to find your modules.
3.  The `paths` configuration option accept value of module with out `.js` extension! If you include it, it will fail to find your module.
4.  If you have large modules that you use all of the time. Try reduce the number of dependency modules your user need to import by writing a wrapper module.
5.  When loading large dependency module list, use a consistent formatting to help. Also, ensure you match up your array of dependency module names with the function callback parameters correctly. Else you get all sort of weird errors. For example:

	```
	require(['mymodulelib',
	  'mymodulelib2',
	  'mymodulelib3',
	  'mymodulelib4',
	  'mymodulelib5'
	], function(lib, lib2, lib3) {// write your module here...});
	```
