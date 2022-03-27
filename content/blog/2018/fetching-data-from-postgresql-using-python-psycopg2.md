Title: Fetching Data From PostgreSQL Using Python psycopg2
Date: 2018-03-04 00:00:00-05:00
Tags: python,postgres



```
import psycopg2
conn = psycopg2.connect('dbname=test user=test')
cur = conn.cursor()
cur.execute("select * from users order by username")
while True:
    row = cur.fetchmany()
    if len(row) == 0:
        break
    print(row)
cur.close()
conn.close()
```

