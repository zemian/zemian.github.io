---
title: Oracle DB Data Types and Test Table 
date: 2018-08-18
tags:
  - sql
  - oracle
---

    --
    -- Notes on Oracle Database 12.2
    -- https://docs.oracle.com/en/database/oracle/oracle-database/12.2/administration.html

    -- DataTypes
    -- https://docs.oracle.com/en/database/oracle/oracle-database/12.2/sqlrf/Data-Types.html

    /*
    CHAR          Fixed length and space padded character string (sql: CHAR)
    VARCHAR2      Variable length character string (sql: VARCHAR)
                  (Oracle discourage use of VARCHAR, even though it's same as VARCHAR2 as of now.)
    NVARCHAR2     Same as VARCHAR2 but with Unicode support
    CLOB          Variable length character large string (sql: TEXT)

    NUMBER(p)     Declare integer number (sql: INT)

    BINARY_FLOAT  Declare floating-point number (sql: REAL 32 bits)
    BINARY_DOUBLE Declare floating-point number (sql: DOUBLE PRECISION 64 bits)

    NUMBER        Declare floating-point number (like NUMERIC with max precision and scale. Values will be stored as exact, not binary.)
    NUMBER(p,s)   Declare fixed-point number (sql: NUMERIC)

    DATE          Declare datetime with no sub second precision (note: it includes time!)
    TIMESTAMP     Declare datetime with sub second precision
    TIMESTAMP WITH TIMEZONE
                  Declare datetime with sub second precision and timezone
    INTERVAL YEAR TO MONTH   Declare period of time difference
    INTERVAL DAY TO DECOND   Declare period of time difference

    BLOB          Binary data
     */

    -- Test table
    create table test (
      id    number(32) generated always as identity primary key,
      ts    timestamp(6) default systimestamp not null,
      cat   varchar2(10) not null,

      price    number(19,4) null,
      qty      int null,

      txtdata  varchar2(1000) null,
      bindata  blob null,

      distx  binary_float null,
      disty  binary_double null
    );
    insert into test(cat, price, qty) values ('test', 100000.10, 50000),
                                             ('test', 100000.20, 0),
                                             ('test', 100000.00, 1),
                                             ('test', 9977000.3333, 179),
                                             ('test', 104729.1129, 104729);
    insert into test(cat, bindata, txtdata) values ('test2', hextoraw('CAFEBABE'), 'CAFEBABE');
    insert into test(cat, bindata) values ('test3', hextoraw(to_char(floor(dbms_random.value(0,256)), 'XX')));
    insert into test(cat, bindata) values ('test3', hextoraw(to_char(floor(dbms_random.value(0,256)), 'XX')));
    insert into test(cat, bindata) values ('test3', hextoraw(to_char(floor(dbms_random.value(0,256)), 'XX')));
    update test set txtdata = rawtohex(bindata) where cat = 'test3';
    insert into test(cat, distx, disty) values ('test4', dbms_random.value(0.0, 1.0), dbms_random.value(0.0, 1.0));
    insert into test(cat, distx, disty) values ('test4', dbms_random.value(0.0, 1.0), dbms_random.value(0.0, 1.0));
    insert into test(cat, distx, disty) values ('test4', dbms_random.value(0.0, 1.0), dbms_random.value(0.0, 1.0));
    select sum(price) from test where cat = 'test';
    select * from test order by cat, ts desc;
