---
title: How to Setup PHP with Xdebug
tags: [php, xdebug]
---

Here are instructions on how to enable [Xdebug](https://xdebug.org/) with PHP.

1. Find out which PHP are you currently running and the `php.ini` that is loaded.

2. Run `pecl install xdebug` and it should automatically install and enable it.
	(Ensure the `pecl` is from the same installation as your `PHP` executable)

3. The install above should autoenabled "xdebug.so" in y our `php.ini` file, but you
   still need to add another line, like this:

	```
	zend_extension="xdebug.so"
	xdebug.mode=debug
	```

4. Verify you have it installed by running `php -v`, and you should see line like this:

	```
	with Xdebug v3.1.3, Copyright (c) 2002-2022, by Derick Rethans
	```
5. Restart `httpd` web server if you are using the `PHP` there.

6. Install [Xdebug Helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc) Chrome Extension and enable "Debug" mode.

7. Now you may reload your `PHP` application on the Chrome browser.

NOTE: After enabled these settings, you should checkout [PHPStorm IDE](https://www.jetbrains.com/phpstorm). It has excellent debugger that let you step through your code like an Ninja!