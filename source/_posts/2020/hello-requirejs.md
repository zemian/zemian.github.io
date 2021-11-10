---
title: Hello RequiredJS
date: 2020-04-18T00:00:00-05:00
tags:
  - requirejs
---

The [RequiredJS](https://requirejs.org/) is a JavaScript library that helps you separate your code into modules as namespaces, and it helps to load them as dependencies when need it. Here is a simple html demo:

```html
<div id="app">
    Hi
</div>

<script src="https://unpkg.com/requirejs@2.3.6/require.js"></script>
<script>
    define('mymodule', [], function() {
        return {
            uniqueId() {
                return Math.random().toString(16).substring(2);
            }
        }
    });
    require(['mymodule'], function(my) {
        console.log("Generating a uniqueId=" + my.uniqueId());
        let output = document.querySelector("#app");
        output.innerHTML = `Hello RequireJS - ${requirejs.version}`;
    });
</script>
```

The RequireJS only introduces three variables you need to learn to use it effectively: `define`, `require`, and `requirejs`.

You use `define()` function to write your own modules. Many JS libraries out there already supporting RequireJS as module, so you can just simply include them in your application! When writing your own module, you usually would store one module per single JS file. If you do that, then the name of the module would simply be the filename, without you having to explicitly named as above example. When writing the module, you may load other modules that you depend on. In our example case above, we do not need any, hence it has an empty array as 2nd parameter. Your module code should wrap inside a function as last parameter. Any object you return from module function, it is exported as module data for caller to consume or load it.

You use `require()` function to load modules that you want to use in your application. Each module imported may be assigned to a parameter variable in the callback function parameters as in example above. Note that sometimes you might load a module without assigning variable for direct use. In this case, the loading of the module is all you care/need. Note also that the order of your module array should match to the call back function parameter list.

There are many configuration options you may setup the RequireJS, and that’s when you use the `requirejs.config()` function. For example you may configure paths to where to look for other external libraries such KnockoutJS like this:

```js
requirejs.config({
	paths: {
		'knockout': 'https://unpkg.com/knockout@3.5.1/build/output/knockout-latest'
	}
});

require(['knockout'], function(ko) {
	ko.applyBindings({msg: "Hello"});
});
```

Notice that the path to knockout module is without the `.js` extension!

The RequireJS is great for writing larger JS application. Modules help you avoid names clash, and it helps break down code into a manageable files.
