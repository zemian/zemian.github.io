title=Hello BulmaCSS
date=2020-04-18
type=post
tags=bulma, css
status=published
~~~~~~


The [Bulma CSS](https://bulma.io/) library is a very nice project with work with. It’s small and has enough features to style just about any thing you want on the web. The Bulma is a pure CSS library and has no JS dependency! I like this minimalist approach to things.

Here is a small hello world example that gets you stared. It gives you a nice clean reset of HTML document and you may start style your world away.

```
<link rel="stylesheet" href="https://unpkg.com/bulma@0.8.1/css/bulma.css">

<div class="container">
    Hello World!
</div>

```

Here is how a table looks like in Bulma:

```
<table class="table is-fullwidth">
    <thead>
    <tr>
        <th>One</th>
        <th>Two</th>
        <th>Three</th>
        <th>Four</th>
        <th>Five</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
    </tr>
    <tr>
        <td>1b</td>
        <td>2b</td>
        <td>3b</td>
        <td>4b</td>
        <td>5b</td>
    </tr>
    <tr>
        <td>1c</td>
        <td>2c</td>
        <td>3c</td>
        <td>4c</td>
        <td>5c</td>
    </tr>
    </tbody>
</table>
```

And here is a quick form:

```
<div class="field">
    <label class="label">Name</label>
    <div class="control">
        <input class="input" type="text" placeholder="e.g Alex Smith">
    </div>
</div><div class="field">
    <label class="label">Email</label>
    <div class="control">
        <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com">
    </div>
</div>
```

Add buttons!

```
<div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-link">Link</button>
</div>

<div class="buttons">
  <button class="button is-info">Info</button>
  <button class="button is-success">Success</button>
  <button class="button is-warning">Warning</button>
  <button class="button is-danger">Danger</button>
</div>
```
