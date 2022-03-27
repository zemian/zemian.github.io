Title: Starting postgres server on Cygwin
Date: 2018-02-20 00:00:00-05:00
Tags: postgres,cygwin



To run postgres database server on Cygwin, you need first run the
`cygserver`. If not, you will get error similar to this:

    export PGDATA=/cygdrive/c/Users/zemian/my-pgdata
    pg_ctl init
    ...
    running bootstrap script ... FATAL:  could not create shared memory segment: Function not implemented
    DETAIL:  Failed system call was shmget(key=1, size=56, 03600).
    child process exited with exit code 1
    initdb: removing contents of data directory "/cygdrive/c/Users/zemian/my-pgdata"
    pg_ctl: database system initialization failed

To resolve this, you first start `cygserver`. Even if you do not have
admin rights to install as Windows service, you can still run it per
shell session. This is needed for **shared memory** need.

    # For the first time, you need config
    /usr/bin/cygserver-config

    # Now run it
    cygserver &

After above then you can start postgres

    pg_ctrl init
    pg_ctrl start

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

