---
title: Creating Oracle Stored Procedure using Java
date: 2012-07-11T00:00:00-05:00
tags:
  - oracle
  - java
---
Did you know you can write Oracle database stored procedure in Java? Give this a try in your `sqlplus` prompt.

```
sql> create or replace and compile java source named "MyJavaDbProcedure" as
sql> public class MyJavaDbProcedure {
sql>   public static String upcase(String text) {
sql>     return text.toUpperCase();
sql>   }
sql> };
sql> /
sql> 
sql> create or replace function upcase (s in varchar2)
sql>   return varchar2
sql> as language java
sql>   name 'MyJavaDbProcedure.upcase(java.lang.String) return java.lang.String';
sql> /
sql> 
sql> select upcase('hello') from dual;
sql> /
```

I let the database compile a Java source directly, but there is also the `java class` PL/SQL that you can load Java binary `.class` file as well. I am sure your DBA will fight all their might to prevent you doing stuff like this. But it's cool to see that this option is available.
