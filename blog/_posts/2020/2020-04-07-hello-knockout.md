---
title: Hello KnockoutJS
date: 2020-04-07T00:00:00-05:00
tags:
  - knockout
---

One cool thing about [KnockoutJS](https://knockoutjs.com/) library is that you can get started with just a single JS file. It allows you to bind a JS object model property to any HTML DOM elements, and automatically update it when property value has changed.

Here is a hello KnockoutJS example app:

```
<div id="app">
    <span data-bind="text: message"></span>
</div>

<script src="https://unpkg.com/knockout@3.5.1/build/output/knockout-latest.js"></script>
<script>
    let app = new function () {
        this.message = ko.observable("Hello");
    };
    ko.applyBindings(app, document.getElementById("app"));
</script>
```

If you run this in browser, you should see “Hello”. Then open the Developer Console and change the model like this:

```
app.message("Hello KnockoutJS");
```

And the browser updates immediately!
