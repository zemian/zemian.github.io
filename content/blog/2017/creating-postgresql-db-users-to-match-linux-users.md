Title: Creating PostgreSQL db users to match Linux users
Date: 2017-07-07 00:00:00-05:00
Tags: postgres



By default the `posgresql-server` install will create a `postgres` Linux
user account and the server will run under that user. And also
PostgreSQL server will default have a DB user named `postgres` as well,
and this DB user does not have a password! There is a distinction
between Linux user vs PostgreSQL database user, and mostly you need to
work with DB user only. After the install, you may change the password
for DB `postgres` like this:

    bash> sudo -u postgres psql

    postgres=# \password postgres

    # It should prompt you to enter password for `postgres` DB user.

When developing application, I like to create a dedicated DB user to
match my login account and create database there instead of using the
default `postgres` user. You may create a new DB user that match to your
current Linux account user (eg: `zemian`) like this:

    bash> sudo -u postgres createdb -s -P zemian
    # It should prompt you to enter password for `zemian` DB user. The `-s` option is to for superuser privileges.

Now that you have a DB user `zemian`, you may create a default database
for it.

    bash> createdb --username=zemian zemian

Now you may invoke `psql` under `zemian` Linux user session without any
parameters and it should log you in!

    bash> psql

    zemian=# CREATE TABLE test(id serial, name VARCHAR(20), message VARCHAR(500));
    NOTICE:  CREATE TABLE will create implicit sequence "test_id_seq" for serial column "test.id"
    CREATE TABLE

    zemian=# \d test
                                     Table "public.test"
     Column  |          Type          |                     Modifiers
    ---------+------------------------+---------------------------------------------------
     id      | integer                | not null default nextval('test_id_seq'::regclass)
     name    | character varying(20)  |
     message | character varying(500) |

    zemian=# INSERT INTO test(name, message) VALUES('Hello', 'World');
    INSERT 0 1
    zemian=# INSERT INTO test(name, message) VALUES('Hello2', 'World2');
    INSERT 0 1
    zemian=# SELECT * FROM test;
     id |  name  | message
    ----+--------+---------
      1 | Hello  | World
      2 | Hello2 | World2
    (2 rows)

