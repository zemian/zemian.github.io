Title: Setup Oracle JET With Public CDN
Date: 2020-04-17 00:00:00-05:00
Tags: ojet




A new Oracle [JET 8.2.0](https://www.npmjs.com/package/@oracle/oraclejet/v/8.2.0) just released! Good time to give you another tips on how to use the toolkit.

You might have noticed that Oracle JET is published under NPM package, and hence you may get it through any CDN network that serve NPM packages directly. A popular one for developer is UNPKG.com. So here I will create a simple ClickCount application that uses external public CDN.

```html
<div id="app" class="oj-web-padding">
    Count: <oj-bind-text value="[[count]]"></oj-bind-text>
    <oj-button on-oj-action="[[onClick]]">Click</oj-button>
</div>

<link href="https://unpkg.com/@oracle/oraclejet@8.2.0/dist/css/alta/oj-alta-min.css" rel="stylesheet">
<script src="https://unpkg.com/requirejs@2.3.6/require.js"></script>
<script>
    requirejs.config({
        paths: {
            'text': 'https://unpkg.com/requirejs-text@2.0.15/text',
            'css': 'https://unpkg.com/require-css@0.1.10/css',
            'jquery': 'https://unpkg.com/jquery@3.4.1/dist/jquery',
            'knockout': 'https://unpkg.com/knockout@3.5.1/build/output/knockout-latest',
            'promise': 'https://unpkg.com/es6-promise@4.2.8/dist/es6-promise.auto.min',
            'signals': 'https://www.unpkg.com/signals@1.0.0/dist/signals.min',
            'customElements': 'https://unpkg.com/@webcomponents/custom-elements@1.2.0/custom-elements.min',
            'jqueryui-amd': 'https://www.unpkg.com/jquery-ui@1.12.1/ui',
            'hammerjs': 'https://www.unpkg.com/hammerjs@2.0.8/hammer.min',
            'ojs': 'https://unpkg.com/@oracle/oraclejet@8.2.0/dist/js/libs/oj/min',
            'ojL10n': 'https://unpkg.com/@oracle/oraclejet@8.2.0/dist/js/libs/oj/ojL10n',
            'ojtranslations': 'https://unpkg.com/@oracle/oraclejet@8.2.0/dist/js/libs/oj/resources',
            'ojdnd': 'https://unpkg.com/@oracle/oraclejet@8.2.0/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.1.min',
            'touchr': 'https://unpkg.com/@oracle/oraclejet@8.2.0/dist/js/libs/touchr/touchr',
        }
    });

    require(['knockout', 'ojs/ojknockout', 'ojs/ojbutton'], (ko) => {
        let app = new function () {
            this.count = ko.observable(0);
            this.onClick = () => {
                this.count(this.count() + 1);
            };
        };
        ko.applyBindings(app);
    });
</script>
```

Compare this to the [Hello OJET](https://medium.com/@zemiandeng/hello-ojet-b750c7acf6bc) I have shown in previous post, this is just a single html file. This is great for quick exploration and demo!

