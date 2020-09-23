---
title: View and terminate Oracle Database user sessions
date: 2015-08-21T00:00:00-05:00
tags:
  - oracle
---

```
Verify sessions:
SELECT USERNAME FROM V$SESSION;

SELECT USERNAME, SID, SERIAL#, STATUS
  FROM V$SESSION
  WHERE USERNAME like 'SCOTT%';

Generate SQL to terminate sessions:
SELECT 'ALTER SYSTEM KILL SESSION ''' || SID || ',' || SERIAL# || ''';'
  FROM V$SESSION
  WHERE USERNAME like 'SCOTT%';
```
