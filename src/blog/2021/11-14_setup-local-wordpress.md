---
title: How to Setup WordPress for Local Development
date: 2021-11-14
tags:
- php
- wordpress
---

The [WordPress installation](https://wordpress.org/support/article/how-to-install-wordpress/) is relative simple, and they even boast about a "famous 5-minute installation". However, what they mean by "5-minutes" part though, is that it only count when you first launched the WordPress site for the first time setup. If you are a newbie, it's likely you haven't install their pre-requisites yet. Here I will summarize the install and setup process for completeness sake.

## The Pre-Requisite Setup

The WordPress requires MySQL database server, and you need PHP and a web server to run it. I will use the Apache HTTPD web server (or Apache for short) here.

If you are using macOS, then you may install these items using `brew` command [package manager](https://brew.sh/) like this:

```
brew install httpd mysql php
brew services start httpd
brew services start mysql
```

If you want to learn each software in detail, checkout their website for their full documentation:

* [Apache HTTPD server](https://httpd.apache.org/)
* [MySQL database server](https://dev.mysql.com/downloads/mysql/)
* [PHP](https://www.php.net/downloads.php)

## The Apache HTTPD Setup

For Apache, you need some manual setup to get PHP working. Edit the Apache config 
`/usr/local/etc/httpd/httpd.conf` file and append the following:

```
# To enable PHP in Apache add the following to httpd.conf and restart Apache:
LoadModule php_module /usr/local/opt/php/lib/httpd/modules/libphp.so
<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>

# Finally, check DirectoryIndex includes index.php
DirectoryIndex index.php index.html
```

NOTE: The path I have is from my installation. You may want to run `brew info httpd` and 
`brew info php` to verify your actual installation paths.

TIPS: For Windows users, you may want to try friendly [XAMPP package](https://www.apachefriends.org/index.html) that comes with all three software!

To verify you have Apache & PHP installed correctly, you need to locate the DocumentRoot directory is.
That's where it host all your HTML files for Apache server. For mine, it's under `/usr/local/var/www/`
You can find your DocumentRoot path inside the Apache config `/usr/local/etc/httpd/httpd.conf` file.
You will also noticed that default port Apache use is `8080`. So create a simple PHP script to test it like this:

```
# file: /usr/local/var/www/phpinfo.php
<?php phpinfo(); ?>
```

Now open `http://localhost:8080/phpinfo.php` to verify. It should print many PHP information for you.

## The Database Setup

Once your MySQL server is running, open a MySQL prompt with `mysql -u root` command. In there we can create a user and an empty database like this:
        
```sql
-- Create DB user
CREATE USER IF NOT EXISTS 'myuser'@'localhost' IDENTIFIED BY 'mypassword';

-- Create DB for wordpress
CREATE DATABASE wordpress CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Grant DB privileges to our user
GRANT ALL PRIVILEGES ON wordpress.* TO 'myuser'@'localhost';
```

> NOTE: Note we are only creating an empty database here. The WordPress database schema is not yet created. It will be created as part of WordPress installation below.

> WARNING: You should change the user and password to something that is more secure; including the WordPress admin user we will setup below.

## The WordPress Install and Setup

1. Download [WordPress](https://wordpress.org/download/#download-install) and unzip it under the DocumentRoot folder (eg: `/usr/local/var/www/`). You should have the `/usr/local/var/www/wordpress` directory after complete.
        
3. Open a browser and visit `http://localhost:8080/wordpress`. This is where your "famous 5-minute installation" starts. Follow the prompt through several pages to get your WordPress up and running. I will give you some basic examples to get started:

    1. A language selection page will greet you. Select `English (United States)` and then press "Continue" button.
    2. Next is an info page telling you that you need the database information to complete the setup. Press "Let's go" button.
    3. Enter the database information, then press "Submit" button:
    
        * Database Name: `wordpress`
        * Username: `myuser`
        * Password: `mypassword`
        * Database Host: `loclhost`
        * Table Prefix: `wp_`
      
    4. A confirmation page will display that you are ready to proceed. Press "Run the installation" button.
    5. A welcome page that prompt to setup the Site information. Press "Install WordPress" button to continue after you entered the following:
    
        * Site Title: `My WordPress`
        * Username: `myadmin`
        * Password: `mypassword`
        * Confirm Password: Check to confirm
        * Your Email: `myadmin@localhost.local`
        * Search engine visibility: Check to discourage search engine
      
    6. Success page will display next, and you may now press "Login in" button to continue.
    
    7. Now your WordPress is ready. You may access two areas of the site:
    
        * `http://localhost:8080/wordpress` - The front-end site for public users. 
        * `http://localhost:8080/wordpress/wp-admin` - The back-end site for admin users.
        
And that's all! Enjoy creating content with WordPress!
