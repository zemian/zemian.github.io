---
title: How to check Oracle Database tablespace
date: 2015-08-14T00:00:00-05:00
tags:
  - oracle
---

When creating a new users in Oracle database (new schema), you need to verify the existing tablespace availability. This query will show you what's there and how much space are free to use.

```
SELECT df.tablespace_name "Tablespace",

  totalusedspace "Used MB",

  (df.totalspace - tu.totalusedspace) "Free MB",

  df.totalspace "Total MB",

  ROUND(100 * ( (df.totalspace - tu.totalusedspace)/ df.totalspace)) "% Free"

FROM

  (SELECT tablespace_name,

    ROUND(SUM(bytes) / 1048576) TotalSpace

  FROM dba_data_files

  GROUP BY tablespace_name

  ) df,

  (SELECT ROUND(SUM(bytes)/(1024*1024)) totalusedspace,

    tablespace_name

  FROM dba_segments

  GROUP BY tablespace_name

  ) tu

WHERE df.tablespace_name = tu.tablespace_name;
```

Also, this query will show where the tablespace file are located:

```
SELECT  FILE_NAME, BLOCKS, TABLESPACE_NAME

   FROM DBA_DATA_FILES;
```

Here are some references on how Oracle manages user, schema and tablespace.

[https://community.oracle.com/message/1832920](https://community.oracle.com/message/1832920)

[http://docs.oracle.com/cd/B28359_01/server.111/b28310/tspaces014.htm#ADMIN11412](http://docs.oracle.com/cd/B28359_01/server.111/b28310/tspaces014.htm#ADMIN11412)
[http://docs.oracle.com/cd/B28359_01/server.111/b28286/statements_8003.htm](http://docs.oracle.com/cd/B28359_01/server.111/b28286/statements_8003.htm)
[http://stackoverflow.com/questions/880230/difference-between-a-user-and-a-schema-in-oracle](http://stackoverflow.com/questions/880230/difference-between-a-user-and-a-schema-in-oracle)
[https://asktom.oracle.com/pls/asktom/f?p=100:11:0::::P11_QUESTION_ID:6162110256950](https://asktom.oracle.com/pls/asktom/f?p=100:11:0::::P11_QUESTION_ID:6162110256950)
