title=How to create MySQL DataSource in WebLogic Server
date=2014-03-08
type=post
tags=weblogic
status=published
~~~~~~
One cool thing about using an application server is that it allows you to create DataSource outside of your application and it can manage it along with connections pool and transaction manager etc. With WebLogic Server, it comes with quite a few built in JDBC drivers such as Oracle Database and MySQL etc ready for your use. Here I will show you how to create a MySQL DataSource.

1. Login into http://localhost:7001/console

2. On the left menu click Services > Data Sources

3. On the right, click "New" button

4. Enter Name: mysql_ds ; You may optionally give it an JNDI Name: jdbc/mysql_ds; And then select Database Type: MySQL

5. Click "Next" button and then accept default with another two "Next" buttons.

6. Now enter Database Name: test; Host Name: localhost; Database User Name: root; and then the password.
7. Click "Next" and you may optionally test your connection here.

8. Click "Next" and you MUST select an sever as target! 

9. Click "Finish"

Now you have a DataSource ready to be used by your application on this server. You may access this by either JNDI lookup, or JPA configuration with entity manager injection.

TIPS: If you do not pick a server Target in step 8, then your applicatoin will NOT able to access this Data Source! So ensure you have done this step as it's the easy step to miss.