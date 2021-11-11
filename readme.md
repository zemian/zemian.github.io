# Zemian's Blog

This is a [Sculpin](https://sculpin.io) static site generator project that
generate http://zemian.github.io site.

## Install

```bash
$ composer install
```

This application uses [Symfony's Webpack Encore](https://symfony.com/doc/current/frontend.html)
to manage CSS, JavaScript and image assets. Install the JS dependencies:

```bash
$ yarn install
```

## Build

First, start Encore to compile and update the assets in `source/assets/` into
`source/build/`. The watcher keeps running until you exit it manually:

```bash
$ composer yarn-watch
```

In a new console, start the sculpin watcher to have your content updated as
soon as you save changes:

```bash
$ composer sculpin-watch
```

Your newly generated site should now be accessible at `http://localhost:8000/`.

## Build Issues

* The default sculpin skeleton contains old version of `node-sass`. And `yarn install` command will fail. We updated the version in `package.json` to `"node-sass": "^6.0.1"` to fix this.
