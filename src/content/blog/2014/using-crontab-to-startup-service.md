---
title: Using crontab to startup service
date: 2014-06-08T00:00:00-05:00
tags:
  - cron
  - backup
---
Did you know that crontab service has the "@reboot" schedule that would start a script during your system startup time? This is handy if you want something to run right after your system has stared. Try this:

```
# crontab -e
@reboot $HOME/crontab/runcmd.sh /apps/start-myapp.sh
```
The disadvantage of this vs the rc.d scripts are you do not have control on when the system shutdown("stop") state. So if your app doens't need to clean up during shutdown, but only care to start when during reboot, this would be an easy option.
