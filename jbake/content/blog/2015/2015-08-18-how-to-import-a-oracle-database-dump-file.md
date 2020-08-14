---
title: How to import a Oracle database dump file
date: 2015-08-18
tags:
  - oracle
---
Here is an example on how to import a Oracle database dump file (a binary file that's exported from a Oracle database using the Oracle data pump utility). For this instruction example, let's say I was given a myapp.dmp.gz file.

NOTE: If you do not use the same db user/tablespace for export and import, then you need to know its names used during export to perform the remapping during import.

Step 1: If you don't have an Oracle database instance to work with, create one first. Or ask your DBA to create or allocate a instance for your import purpose.

Step 2: Create a new tablespace and a DB user in an Oracle database instance. (For this example, I will call my new user MYAPP08182015, password Password1, and tablespace named MY_TABLE_SPACE.)

create tablespace MY_TABLE_SPACE datafile
  '/opt/myapp_datafiles/MY_TABLE_SPACE.dat'
  size 500m autoextend on next 500m
  extent management local
  segment space management auto;

create user MYAPP08182015 identified by Password1
  default tablespace MY_TABLE_SPACE
  temporary tablespace TEMP
  quota unlimited on MYTABLESPACE;

grant create session, grant any privilege to MYAPP08182015;
grant IMP_FULL_DATABASE to MYAPP08182015;

create directory MY_DATADUMP_DIR as '/opt/myapp_datadump';

Note that user must have IMP_FULL_DATABASE privilege to be able to used by import tool. And if you don't want to use default import data directory, then you would need to create the directory object to be used by import as shown above.

Note also that your TEMP tablespace might not have enough disk space for large import. In this case, you may increase it like this:

alter tablespace temp add tempfile
  '/opt/myapp_datafiles/TEMP2.dat'
  size 500m autoextend on next 500m;

Step 3: Now you have a new db User (Schema) and password, you may start the data import using the command line prompt. Ssh into the database server where you can find the impdp command utility.

scp myapp.dmp.gz zemian@mydbserver:/opt/myapp_datadump
ssh zemian@mydbserver
cd /opt/myapp_datafiles
gunzip myapp.dmp.gz
/app/oracle/dbhome/bin/impdp MYAPP08182015/Password1 DIRECTORY=MY_DATADUMP_DIR REMAP_SCHEMA=MYAPP:MYAPP08182015 REMAP_TABLESPACE=USERS:MY_TABLE_SPACE LOGFILE=myapp-import.log DUMPFILE=myapp.dmp

References:
[http://docs.oracle.com/cd/B19306_01/server.102/b14215/dp_overview.htm](http://docs.oracle.com/cd/B19306_01/server.102/b14215/dp_overview.htm)