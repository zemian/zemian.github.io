---
title: Checking MySQL database connection with mysql-connector-python
date: 2015-10-09T00:00:00-05:00
tags:
  - python
  - mysql
---
First install the MySQL package

	bash>pip install --allow-all-external mysql-connector-python

Now you may test the database connection with this Python code

```
from mysql.connector import connect

conn = connect(user='dev', password='dev123', database='mysql')
cur = conn.cursor()
cur.execute('select 1+1')
for row in cur:
print(row)
```
