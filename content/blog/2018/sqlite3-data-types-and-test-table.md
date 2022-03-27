Title: SQLite3 Data Types and Test Table
Date: 2018-08-21 00:00:00-05:00
Tags: sql,sqlite3




A quick sql table setup to test most common data types.


```sql
-- Notes for SQLite3 Database (3.24)
-- https://www.sqlite.org/docs.html

-- Data Types
-- https://www.sqlite.org/datatype3.html

-- Functions
-- https://www.sqlite.org/lang_corefunc.html

/*
SQLite does not have strong data type, but dynamic type that define by value rather than by schema/container.

SQLite only has 5 storage class that it can be used to store data (desc their doc):

NULL. The value is a NULL value.
INTEGER. The value is a signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.
REAL. The value is a floating point value, stored as an 8-byte IEEE floating point number.
TEXT. The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
BLOB. The value is a blob of data, stored exactly as it was input.

SQLite can conform to standard SQL types by mapping what's called "affinity" type.

CHAR          Map to TEXT
VARCHAR       Map to TEXT
TEXT          Map to TEXT

INT           Map to INTEGER

REAL             Map to REAL
DOUBLE PRECISION Map to REAL

NUMERIC       Map to INTEGER, REAL, TEXT or BLOB

DATE          Map to INTEGER, REAL, TEXT or BLOB
DATETIME      Map to INTEGER, REAL, TEXT or BLOB

NOTE: Despite there is a "NUMERIC" affinity type, it's not a fixed-point type! SQLite
does not have native NUMERIC. It will dynamically choose a best fit storage class
instead (REAL if it can keep 15 digits accuracy). If you need true fixed point data type,
you may try to use TEXT data stored instead. Same as with DATETIME types. For example you
can store DATETIME as TEXT, and then SQLite provides many built-in functions that help you
manipulate dates instead. Note also that precision and scale such as VARCHAR(n) or
NUMERIC(p, s) has no real meaning other than DDL schema documentation only!

The SQLite INT size can auto grow into 64-bits (like sql: BIGINT) if needed. The REAL type
is 64-bits size! (unlike many other DB that use REAL for 32-bits and DOUBLE PRECISION for
64 bits).
 */

-- Test table
create table test(
  id      integer primary key,
  ts      text default (datetime('now')),
  cat     text,

  price   text,
  qty     int,

  txtdata text,
  bindata blob,

  distx   real,
  disty   real
);
insert into test(cat, price, qty) values ('test', 100000.10, 50000),
                                         ('test', 100000.20, 0),
                                         ('test', 100000.00, 1),
                                         ('test', 9977000.3333, 179),
                                         ('test', 104729.1129, 104729);
insert into test(cat, bindata, txtdata) values ('test2', x'CAFEBABE', 'CAFEBABE');
insert into test(cat, bindata) values ('test3', randomblob(16));
insert into test(cat, bindata) values ('test3', randomblob(16));
insert into test(cat, bindata) values ('test3', randomblob(16));
update test set txtdata = hex(bindata) where cat = 'test3';
insert into test(cat, distx, disty) values ('test4', random(), random());
insert into test(cat, distx, disty) values ('test4', random(), random());
insert into test(cat, distx, disty) values ('test4', random(), random());
select sum(price) from test where cat = 'test';
select * from test order by cat, ts desc;
```

