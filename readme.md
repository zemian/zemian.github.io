# Zemian's Blog

This is a [Sculpin](https://sculpin.io) static site generator project that
generate http://zemian.github.io site.

## Install

```
composer install
```

This application uses [Symfony's Webpack Encore](https://symfony.com/doc/current/frontend.html)
to manage CSS, JavaScript and image assets. Install the JS dependencies:

```
yarn install
```

If CSS and JS are modify, you need to run:

```
composer yarn-watch
```

NOTE: We are not using any custom css/js right now. The Bulma and VueJS files are directly copy into assets folder.

## Writing Blog

First start dev server

```
./dev.sh
```

Your newly generated site should now be accessible at `http://localhost:8000/`

To publish, run

```
./publish.sh
```

## ZBlog Logo

* https://danmarshall.github.io/google-font-to-svg-path/
  * Size: 50
* https://fonts.google.com/?preview.text=ZBlog&preview.text_type=custom&category=Handwriting

## Google Search Engine for "Zemian's Blog"

https://programmablesearchengine.google.com/cse/setup/basic?cx=5bfbcfd67681f7be8

