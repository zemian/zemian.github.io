---
title: Init and Start PostgreSQL in Cygwin
date: 2018-03-22T00:00:00-05:00
tags:
  - postgres
---

Run Postgres Server
===================

    # Start /usr/sbin/cygserver first if you haven't already done so
    mkdir /srv/pgdata
    export PGDATA=/srv/pgdata
    pg_ctl init
    pg_ctl start

Test Posgres Using Client
-------------------------

    psql postgres

    postgres=# create table test_ratings(username varchar(200), rating int);
    postgres=# insert into test_ratings values('tester1', 5), ('tester2', 4);
    postgres=# select * from test_ratings;
     username | rating
    ----------+--------
     tester1  |      5
     tester2  |      4

Test connectivity using Python
------------------------------

Run `pip install psycopg2` if you haven’t already install the driver.

**`testdb.py`.**

    import psycopg2
    with psycopg2.connect('dbname=postgres') as conn:
            with conn.cursor() as cur:
                    cur.execute('select * from test_ratings')
                    while True:
                            row = cur.fetchmany()
                            if len(row) == 0:
                                    break
                            print(row)

Postgres Windows Installation
=============================

The official download is provided by EnterpriseDB (EDB) You can get a
zip package from:

<https://www.enterprisedb.com/download-postgresql-binaries>

To install, just unzip it.

    mkdir $HOME/apps/postgresql-10.3-2
    cd $HOME/apps/postgresql-10.3-2
    unzip postgresql-10.3-2-windows-x64-binaries.zip

Server can be started manually like this in cmd.exe prompt:

    bin\pg_ctl -D data -o "--encoding=UTF8 --auth=trust" initdb
    mkdir logs
    bin\pg_ctl -D data -l logs\postgres.log start

    bin\createdb %USERNAME%
    chcp 1252
    bin\psql

    zemian=# select version();
                              version
    ------------------------------------------------------------
     PostgreSQL 10.3, compiled by Visual C++ build 1800, 64-bit
    (1 row)

By default inidb will create a "postgres" database, but user is your
Windows login name, and it will not match. It’s more convient to create
a database that match your username, and use that as default.

You should be careful with "--auth=trust", which can get you started
quickly but not very secure.
