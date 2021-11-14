---
title: How to Setup WordPress For Local Development
date: 2021-11-14
tags:
- php
- wordpress
---

The [WordPress installation](https://wordpress.org/support/article/how-to-install-wordpress/) is relative simple, and they even boast about a "famous 5-minute installation". However, what they mean by "5-minutes" part though, is that it only count when you first launched the WordPress site for the first time setup. If you are a newbie, it's likely you haven't install their pre-requisites yet. Here I will summarize the install and setup process for completeness sake.

## The Pre-Requisite Setup

The WordPress requires MySQL database server, and you need PHP and a web server to run it. Setting up web server such as Apache with PHP can be complicated, but if you want just to explore for local development, we can simply use the PHP built-int web server. This built-in PHP web server doesn't require setup and it's easy to use!

If you are using macOS, then you may install the two items using `brew` command [package manager](https://brew.sh/) ) like this:

```
brew install mysql@5.7 php@7.4
brew services start mysql@5.7
```

Or, alternatively, you may install them manually:

1. Install [MySQL database server](https://dev.mysql.com/downloads/mysql/).
2. Install [PHP](https://www.php.net/downloads.php).

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

1. Download [WordPress](https://wordpress.org/download/#download-install) and unzip it under `$HOME/wordpress`

2. Open a command prompt Terminal and cd into the directory and start the built-in PHP web server:

    ```
    cd $HOME/wordpress
    php -S localhost:3000
    ```
        
3. Open a browser and visit [http://localhost:3000/](http://localhost:3000/). This is where your "famous 5-minute installation" starts. Follow the prompt through several pages to get your WordPress up and running. I will give you some basic examples to get started:

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
    
        * [http://localhost:3000/](http://localhost:3000/) - The front-end site for public users. 
        * [http://localhost:3000/wp-admin](http://localhost:3000/wp-admin) - The back-end site for admin users.
        
And that's all! Enjoy creating content with WordPress!
