---
title: How to install cx_Oracle module on Linux
date: 2016-07-23T00:00:00-05:00
tags:
  - python
  - oracle
---

Here are my notes on installing [`cx_Oracle` python
module](http://cx-oracle.sourceforge.net/) to access Oracle Database
12c. First, you need to download these two packages from [Oracle Instant
Client](http://www.oracle.com/technetwork/database/features/instant-client)
site.

-   Instant Client Package - Basic

-   Instant Client Package - SDK

I’ve tried their `.rpm` packages and it did not work for me on Linux, so
I would suggest you use the `.zip` packages instead.

Once you downloaded these two, unzip them into a single directory (eg:
`$HOME/apps/instantclient`). You then need to follow these instructions
to install the module itself.

    cd $HOME/apps/instantclient
    ln -s libclntsh.so.12.1 libclntsh.so
    export ORACLE_HOME=$HOME/apps/instantclient
    export LD_LIBRARY_PATH=$ORACLE_HOME:$LD_LIBRARY_PATH

    pip install cx_Oracle

Here are some quick python test code to verify `cx_Oracle` is working.

    import cx_Oracle as db
    dsn='(DESCRIPTION=(ADDRESS=(HOST=myhost)(PORT=1521)(PROTOCOL=TCP))(CONNECT_DATA=(SERVER=DEDICATED)(SID=orcl)))'
    conn = db.connect('zemian', 'Welcome1', dsn)
    cur = conn.cursor()
    cur.execute('SELECT 1+1')
    print(cur.fetchone()[0])
    cur.close()
    conn.close()

Using the `dsn` form above can connect directly to database without the
need to setup further entry in Oracle’s `tnsnames.ora` file.

Optionally installing sqlplus client
====================================

The `sqlplus` is a classic client you may use to connect to the Oracle
database. You may install this to perform adhoc query and verify your
data. Download the following from the same download site above.

-   Instant Client Package - `SQL\*Plus`

Unzip and then add the following to your `PATH`

    export $ORACLE_HOME/bin:$PATH

    sqlplus mydbuser@(DESCRIPTION=(ADDRESS=(HOST=myhost)(PORT=1521)(PROTOCOL=TCP))(CONNECT_DATA=(SERVER=DEDICATED)(SID=orcl)))

For more information, see [`sqlplus`
doc](https://docs.oracle.com/database/121/SQPUG/toc.htm)
