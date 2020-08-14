---
title: Getting started with PostgreSQL database
date: 2016-06-26
tags:
  - postgres
---

I have been learning and using PostgreSQL recently for a Django app, and I have to say it's really GOOD! I have used quite a bit of MySQL and Oracle DB in my workplace, so I didn't find good reason to learn PostgreSQL in the past. Now I finally get a chance to start another new project with Django, so I decided to give it a try, and I wasn't disappointed. I will write up a brief getting started guide here for those impatient to get things moving.

Installing. If you are running on a Mac, the easiest way to try it out is just get the http://postgresapp.com, you just start the App, and your DB is running! No config needed!

After you have the database installed and running, you can either connect to the default "postgres" public database by (psql command), or create your own database. To create your own database, you run this command:

	bash> PATH=/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH
	bash> createdb mydb

Now you can connect to the new database

	bash> psql -d mydb

Once you connected to database, you may run SQL to create/insert/select a table:

```
mydb-# create table test(id serial, name varchar(200));
mydb-# insert into test(name) values('Hello');
mydb-# select * from test; 

To inspect your  table columns:
mydb-# \d test;

To see all tables available:
mydb-# \dt;

To see all database available:
mydb-# \l;

To switch to another database:
mydb-# \c mydb2;

To see more help (check out \d options! it's super flexible and useful.):
mydb-# \?;

To quit the psql shell:
mydb-# \q;
```

To create a database user and set up password, you can do it on bash shell as well:

	bash> echo "CREATE ROLE mydbuser1 WITH CREATEDB LOGIN PASSWORD 'Welcome1'" | psql

	bash> echo "GRANT ALL PRIVILEGES ON DATABASE mydb TO mydbuser1" | psql

Now you may relogin again with the user. It should prompt you for password.

	bash> psql -U mydbuser1 -W

     

Once you connected to your database again, you may check your user privileges:

	mydb-# \dp;

These examples should be enough to get you setup a database for app development. The rest are just normal SQL access to database. The [PostgresSQL documentation](https://www.postgresql.org/docs/9.5/static/index.html) is an excellent reference for all that you need.