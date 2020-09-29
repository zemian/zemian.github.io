---
title: Sybase Data Types and Test Table 
date: 2018-08-19T00:00:00-05:00
tags:
  - sql
  - sybase
---


A quick sql table setup to test most common data types.


```sql
-- Notes for Sybase Database 16
-- http://infocenter.sybase.com/help/index.jsp?topic=/com.sybase.infocenter.dc70202.1570/html/quickref/title.htm

-- Data Types
-- http://infocenter.sybase.com/help/index.jsp?topic=/com.sybase.infocenter.dc32300.1600/doc/html/san1390612189202.html

/*

CHAR          Fixed length and space padded character string (sql: CHAR)
VARCHAR       Variable length character string (sql: VARCHAR)
UNIVARCHAR    Same as VARCHAR but with Unicode support
TEXT          Variable length character large string (sql: TEXT)

INT           Declare integer number (sql: INT 32 bits)
SMALLINT      16 bits
BIGINT        64 bits

REAL             Declare floating-point number 32 bits
DOUBLE PRECISION Declare floating-point number 64 bits

NUMERIC(p,s)     Declare fixed-point number (sql: NUMERIC)

DATE          Declare date
TIME          Declare time
DATETIME      Declare datetime with sub second precision

BINARY        Binary data
BINARY        Binary data
BINARY        Binary data

 */
-- Test table
create table test(
  id    int identity primary key not null,
  ts    datetime default getdate() not null,
  cat   varchar(10) not null,

  price    numeric(19,4) null,
  qty      int null,

  txtdata  text null,
  bindata  binary null,

  distx  real null,
  disty  double precision null
);
insert into test(cat, price, qty) values ('test', 100000.10, 50000),
                                         ('test', 100000.20, 0),
                                         ('test', 100000.00, 1),
                                         ('test', 9977000.3333, 179),
                                         ('test', 104729.1129, 104729);
insert into test(cat, bindata, txtdata) values ('test2', 0xCAFEBABE, 'CAFEBABE');
insert into test(cat, bindata) values ('test3', convert(binary, rand()));
insert into test(cat, bindata) values ('test3', convert(binary, rand()));
insert into test(cat, bindata) values ('test3', convert(binary, rand()));
insert into test(cat, distx, disty) values ('test4', rand(), rand());
insert into test(cat, distx, disty) values ('test4', rand(), rand());
insert into test(cat, distx, disty) values ('test4', rand(), rand());
select sum(price) from test where cat = 'test';
select * from test order by cat, ts desc;
```
