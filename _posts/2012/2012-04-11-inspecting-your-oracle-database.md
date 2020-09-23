---
title: Inspecting your Oracle database
date: 2012-04-11T00:00:00-05:00
tags:
  - oracle
---
Some quick tips on how to inspect what you have in your Oracle database.

```    
-- show all schemas
select distinct owner from dba_segments where owner in
     (select username from dba_users where default_tablespace not in ('SYSTEM','SYSAUX'));

-- show all tables from a schema/owner
select * from all_tables where owner = 'HR';

-- show table description
desc HR.EMPLOYEES;

-- show all users
select * from all_users;
select username, * from dba_users;


-- See who is taking up a DB lock
select c.*, b.* from v$lock a, dba_locks b, v$session c 
  where a.id1 = b.lock_id1 and b.session_id = c.sid

-- See internal SQL id
select * from v$sql

-- See Oracle latches:
select * from v$latch

-- See Library Cache of SGA (System Global Area) like buffer cache size:
select * from v$sgastat

-- See tx locks (TX) and DML locks (TM):
select * from v$lock where type in ('TX', 'TM')
select * from dba_locks where lock_type in ('Transaction', 'DML')
```
    
