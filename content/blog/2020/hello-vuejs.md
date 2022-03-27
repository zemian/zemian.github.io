Title: Hello VueJS
Date: 2020-04-18 00:00:00-05:00
Tags: vuejs



I like [VueJS](http://vuejs.org/) because it’s similar to [KnockoutJS](hello-knockout.md) that I am familiar with. The VueJS has much more modern feel and the code is a lot more smoother compare to the KnockoutJS. One big difference is KO uses the Observable object to bind reactive properties, while in VueJS it can be treated as normal JS properties.

Get started on [VueJS](https://vuejs.org/) with single JS script.

```html
<div id="app">
    <span v-text="message"></span>
</div>

<script src="https://unpkg.com/vue@2.6.11/dist/vue.js"></script>
<script>
    let app = new Vue({
        data: {
            message: "Hello"
        }
    });
    app.$mount("#app");
</script>
```

If you run this in browser, you should see “Hello”. Then open the Developer Console and change the model like this:

```js
app.message = "Hello VueJS";
```

And the browser updates immediately!

