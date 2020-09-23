---
title: Quick project sharing with hg over ssh
date: 2014-03-04T00:00:00-05:00
tags:
  - hg
---
Mercurial is an awesome source control system! If you got a project in your PC and would like to share with your team. An easy and practical way is to put it in a common server (eg: linux) with ssh enabled.

1. Copy your existing project source into your server $HOME/repo/myproject

2. ssh into your server and cd into $HOME/repo/myproject

3. Run # hg init && hg commit -m 'Init added'

5. Exit your server and get your project in your PC terminal and run:

    `# hg clone ssh://user_id@myserver/repo/myproject`

That's it. You don't even need a web server to host it! Just tell all your teammates to do the last step on their own PC terminal. Now eveyone can make changes to your project then commit and push or pull!

TIPS: If you do not place your "repo/myproject" directory under your $HOME, then you would need the double slashes when cloning! For example:

    `# hg clone ssh://user_id@myserver//usr/local/repo/myproject`
