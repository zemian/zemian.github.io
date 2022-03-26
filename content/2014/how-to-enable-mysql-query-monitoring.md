---
title: How to enable MySQL query monitoring
date: 2014-04-16T00:00:00-05:00
tags:
  - mysql
---

Do you need to monitor any SQL statements passing through your MySQL server? You would need to turn on the server logging. Edit your my.cnf file and add these:
```
log-output=FILE
general-log=1
general_log_file=mysql-general.log
```
You also need to restart the database server after these changes.
