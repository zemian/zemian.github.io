# Zemian's Blog

This is a [Sculpin](https://sculpin.io) static site generator project that
generate http://zemian.github.io site.

NOTE: Current sculpin 3.1 requires PHP 7.4!

## Install

```
composer install
```

This application uses [Symfony's Webpack Encore](https://symfony.com/doc/current/frontend.html)
to manage CSS, JavaScript and image assets. Install the JS dependencies:

```
npm install
node_modules/.bin/encore dev
```

If CSS and JS are modify, you need to run:

```
node_modules/.bin/encore dev --watch
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

## PHP 8.0.13 Error

When using this specific PHP, we see this error:

```
PHP Fatal error:  Uncaught TypeError: Sculpin\Core\Permalink\SourcePermalinkFactory::normalize(): Argument #1 ($param) must be of type string, null given, called in /my-project/vendor/sculpin/sculpin/src/Sculpin/Core/Permalink/SourcePermalinkFactory.php on line 110 and defined in /my-project/vendor/sculpin/sculpin/src/Sculpin/Core/Permalink/SourcePermalinkFactory.php:214
```

Temp fix: Add "string|null" to the function definition on `/my-project/vendor/sculpin/sculpin/src/Sculpin/Core/Permalink/SourcePermalinkFactory.php:214`

```
private function normalize(string|null $param, string $space = '-'): string {
  if ($param === null)
            return "";
  ...
}
```
