---
title: How to Load Multiple jQuery
date: 2020-09-19T00:00:00-05:00
tags:
- js
- jquery
- requirejs
---

Sometimes, your site might need to load mulitple versions of jQuery to support some legacy libraries. Here I will provide two ways to do that.

## Using plain HTML/JS

```js
<script src="https://unpkg.com/jquery@3.5.1/dist/jquery.js"></script>
<script>let jq3 = jQuery.noConflict(true);</script>
<script src="https://unpkg.com/jquery@1.12.4/dist/jquery.js"></script>
<script>let jq1 = jQuery.noConflict(true);</script>


<script>
// Now we can use each jQuery with the name assigned.
console.log("jQuery 3 version " + jq3.fn.jquery);
console.log("jQuery 1 version " + jq1.fn.jquery);

console.log("jQuery 3 document ", jq3(document));
console.log("jQuery 1 document ", jq1(document));
</script>
```

NOTE: You need to call `noConflict()` immediately after the script tag load of the jQuery. If you are dealing with multiple jQuery, it's best not to use the `$` global variable to avoid confusion.

## Using RequireJS

```js
<script src="https://unpkg.com/requirejs@2.3.6/require.js"></script>
<script>
	define('jq3', ['https://unpkg.com/jquery@3.5.1/dist/jquery'], function() {
		return jQuery.noConflict(true);
	});
	define('jq1', ['https://unpkg.com/jquery@1.12.4/dist/jquery'], function() {
		return jQuery.noConflict(true);
	});

	require(['jq3', 'jq1'], function(jq3, jq1) {
		jq3(function () {
		console.log("jQuery 3 version " + jq3.fn.jquery);
		console.log("jQuery 1 version " + jq1.fn.jquery);

		console.log("jQuery 3 document ", jq3(document));
		console.log("jQuery 1 document ", jq1(document));
		});
	});
</script>
```

NOTE: Do not load multiple versions of jQuery through the `paths` inside `requirejs.config()` method. As that will automatically bind the `jquery` module name and you can't change that.
