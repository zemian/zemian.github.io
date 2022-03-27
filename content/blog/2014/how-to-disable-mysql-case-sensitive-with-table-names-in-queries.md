Title: How to disable MySQL case sensitive with table names in queries
Date: 2014-04-13 00:00:00-05:00
Tags: mysql


My latest install of MySQL 5.16 on Windows 7 is case sensitive with table names. I much prefer it's case in-sensitive for faster typing and adhoc queries. To do that, I need to edit the my.cnf file (Try running "mysql --help" and it will tell you where it is.)

At the end of the file, add this line:

```lower_case_table_names = 1```

