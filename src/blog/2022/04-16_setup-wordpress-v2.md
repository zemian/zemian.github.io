---
title: How to Setup WordPress for Local Development - V2
date: 2022-04-16
tags: [php, wordpress, mysql, apache, git]
---

In previous post, I have shown you [how to setup WordPress from scratch](/blog/2021/how-to-setup-wordpress-for-local-development/). That article helps you get up and running quickly. However, as you write and develop your own WordPress plugin and theme, these files are actually located inside the `wordpress/wp-content` folder. Now if you were to create a Git repository to save your work, one solution is to simply commit the entire `wordpress` folder into Git. However, when it's time to update your WordPress (and they run updates often), you would have to commit the updated files into Git as well.

Now it would be nice that if we leave the `wordpress` folder completely alone, and do not even commit into Git, but save only our plugins and themes files. This mean we need to move the `wordpress/wp-content` folder outside. Another problem to address is the WordPress load a configuration file from `wordpress/wp-config.php`, and we typically do not want this file to be committed into Git. The config file will contain the DB user and password and all the settings that specific to one environment, such as either for local development or for production use.

So I have created the [my-wordpress-starter](https://github.com/zemian/my-wordpress-starter) template that does just that. All the step-by-step instructions are in the readme file! I am calling this the "Version 2 of the WordPress setup for local development". Thanks to the [WP-CLI](https://wp-cli.org/) tool,  I was able to automate many of the setup steps, and provided a `wp-config-local.php` file that you may copy into the real `wp-config.php`. My local version will allow you to use separate `my-wp-content` outside of the `wordpress` application folder, and avoid adding into the Git repository. Go ahead, give it a try by clicking the "Use this template" button on GitHub and start your next WordPress project! 
