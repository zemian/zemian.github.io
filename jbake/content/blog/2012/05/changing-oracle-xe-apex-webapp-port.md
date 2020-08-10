title=Changing Oracle XE apex webapp port
date=2012-05-11
type=post
tags=oracle_xe
status=published
~~~~~~
If you use Oracle XE for development, then you know it has a simple web interface through http://localhost:8080/apex. Now port 8080 is a common port used by Tomcat server, so letting Oracle XE permanently have taken it is not convenient. But you can change it like this:

    
     sql> select dbms_xdb.gethttpport from dual;
     sql> exec dbms_xdb.sethttpport('8081');
     sql> commit;
    
     bash> open http://localhost:8081/apex
    

Also, if you ever deleted the HR sample database on the XE installation, you can restore it like this:

    
     bash> cd /c/oraclexe/app/oracle/product/10.2.0/server/demo/schema/human_resources
     bash> sqlplus system < hr_main.sql
    