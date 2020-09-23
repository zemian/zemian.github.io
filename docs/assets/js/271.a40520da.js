(window.webpackJsonp=window.webpackJsonp||[]).push([[271],{653:function(t,e,n){"use strict";n.r(e);var s=n(10),a=Object(s.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[e("p",[this._v("A quick sql table setup to test most common data types.")]),this._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("-- Notes for MySQL (8)\n-- https://dev.mysql.com/doc/refman/8.0/en/\n\n-- Data Types\n-- https://dev.mysql.com/doc/refman/8.0/en/data-types.html\n\n/*\n\nCHAR          Fixed length and space padded character string (sql: CHAR)\nVARCHAR       Variable length character string (sql: VARCHAR)\nTEXT          Variable length character large string (sql: TEXT)\n\nINT           Declare integer number (sql: INT 32 bits)\nSMALLINT      16 bits\nBIGINT        64 bits\nSERIAL        Auto increment integer (INT with sequence)\n              An alias for BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE.\n\nREAL             Declare floating-point number 32 bits\nDOUBLE PRECISION Declare floating-point number 64 bits\n\nNUMERIC(p,s)     Declare fixed-point number (sql: NUMERIC)\n\nDATE          Declare date\nTIME          Declare time\nTIMESTAMP     Declare datetime (stored as UTC but convert to client session timezone)\n\nBLOB          Binary data\n\n */\n\n-- test table\ncreate table test(\n  id       serial primary key,\n  ts       timestamp default current_timestamp,\n  cat      varchar(10),\n\n  price    numeric(19,4),\n  qty      int,\n\n  txtdata  text,\n  bindata  blob,\n\n  distx    real,\n  disty    double precision\n);\ninsert into test(cat, price, qty) values ('test', 100000.10, 50000),\n                                         ('test', 100000.20, 0),\n                                         ('test', 100000.00, 1),\n                                         ('test', 9977000.3333, 179),\n                                         ('test', 104729.1129, 104729);\ninsert into test(cat, bindata, txtdata) values ('test2', X'CAFEBABE', 'CAFEBABE');\ninsert into test(cat, bindata) values ('test3', unhex(replace(uuid(), '-','')));\ninsert into test(cat, bindata) values ('test3', unhex(replace(uuid(), '-','')));\ninsert into test(cat, bindata) values ('test3', unhex(replace(uuid(), '-','')));\nupdate test set txtdata = hex(bindata) where cat = 'test3';\ninsert into test(cat, distx, disty) values ('test4', rand(), rand());\ninsert into test(cat, distx, disty) values ('test4', rand(), rand());\ninsert into test(cat, distx, disty) values ('test4', rand(), rand());\nselect sum(price) from test where cat = 'test';\nselect * from test order by cat, ts desc;\n")])])])])}),[],!1,null,null,null);e.default=a.exports}}]);