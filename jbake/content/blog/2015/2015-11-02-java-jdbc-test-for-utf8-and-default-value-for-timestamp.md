---
title: Java Jdbc Test for UTF8 and Default Value for TIMESTAMP
date: 2015-11-02
tags:
  - java
  - jdbc
---
Just a quick MySQL test on how to use UTF8 encoding with JDBC connection string. Also a test on how to set TIMESTAMP default values.

```
package zemian.jdbc;

import org.junit.Test;

import java.sql.*;
import java.util.*;
import java.util.Date;

/**

 -- drop table ztest_issues;
 CREATE TABLE ztest_issues(
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
 , title VARCHAR(64) NOT NULL
 , summary TEXT NULL
 , priority INT NOT NULL DEFAULT 5
 , cdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
 );

 INSERT INTO ztest_issues(title) VALUES('test');
 INSERT INTO ztest_issues(title, summary) VALUES('test2', 'Just a test');
 INSERT INTO ztest_issues(title, summary, priority) VALUES('test2', 'Just a test', 1);
 INSERT INTO ztest_issues(title, summary, priority, cdate) VALUES('test2', 'Just a test', 1, '2010-12-31 08:00:00');

 --INSERT INTO ztest_issues(title, summary) VALUES('locale test1', LOAD_FILE('C:/data/tmp/test.xml'));
 --INSERT INTO ztest_issues(title, summary) VALUES('locale test2', LOAD_FILE('C:/data/tmp/test2.xml'));
 --INSERT INTO ztest_issues(title, summary) VALUES('locale test3', LOAD_FILE('C:/data/tmp/test3.xml'));

 SELECT * FROM ztest_issues;

 NOTE:
 CURRENT_TIMESTAMP is version specific and is now allowed for DATETIME columns as of version 5.6 http://dev.mysql.com/doc/refman/5.6/en/timestamp-initialization.html

 For 5.6 <, use TIMESTAMP for cdate field instead.

 cdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
 cdate DATETIME NULL

 NOTE2:
 cdate DATETIME NOT NULL DEFAULT 0

 If you were to use default to ZERO, then you would need this properties in conn string. Else you will fail to get ZERO date value into Java.

 You need to tell the JDBC driver to convert them to NULL. This is done by passing a connection property name zeroDateTimeBehavior with the value convertToNull

 For more details see the manual: http://dev.mysql.com/doc/refman/4.1/en/connector-j-installing-upgrading.html

 */
public class ZtestIssuesJdbcTest {
//    String url = "jdbc:mysql://localhost/test";
//    String url = "jdbc:mysql://localhost/test?zeroDateTimeBehavior=convertToNull";
    String url = "jdbc:mysql://localhost/test?useUnicode=true&characterEncoding=UTF-8&connectionCollation=utf8_general_ci&zeroDateTimeBehavior=convertToNull";
    String username = "test";
    String password = "test123";

    @Test
    public void testShowTableLocale() throws Exception {
        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            String sql = "SHOW VARIABLES LIKE 'char%'";
            System.out.println("Sql:" + sql);
            Statement sm = conn.createStatement();
            ResultSet rs = sm.executeQuery(sql);
            while (rs.next()) {
                System.out.printf("%s\t%s\n", rs.getObject(1), rs.getObject(2));
            }

            sql = "SHOW CREATE TABLE ztest_issues";
            System.out.println("Sql:" + sql);
            sm = conn.createStatement();
            rs = sm.executeQuery(sql);
            while (rs.next()) {
                System.out.printf("%s\t%s\n", rs.getObject(1), rs.getObject(2));
            }
        }
    }

    @Test
    public void testQuery() throws Exception {
        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            String sql = "SELECT id, cdate, title, summary FROM ztest_issues";
            System.out.println("Sql:" + sql);
            Statement sm = conn.createStatement();
            ResultSet rs = sm.executeQuery(sql);
            while (rs.next()) {
                System.out.printf("%d\t%s\t%s\t%s\n", rs.getObject(1), rs.getObject(2), rs.getObject(3), rs.getObject(4));
            }
        }
    }

    @Test
    public void testInsert() throws Exception {
        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            String sql = "INSERT INTO ztest_issues(title, summary, cdate) VALUES(?, ?, ?)";
            System.out.println("Sql: " + sql);
            PreparedStatement ps = conn.prepareStatement(sql);

            String testId = "" + System.currentTimeMillis();

            ps.setObject(1, "English Locale " + testId);
            ps.setObject(2, "Just a test");
            ps.setObject(3, new Date());
            int result = ps.executeUpdate();
            System.out.println("Insert Result: " + result);

            ps.setObject(1, "Chinese Locale " + testId);
            ps.setObject(2, "&#21482;&#26159;&#19968;&#20491;&#28204;&#35430;");
            ps.setObject(3, new Date());
            result = ps.executeUpdate();
            System.out.println("Insert Result: " + result);

            ps.setObject(1, "Spanish Locale " + testId);
            ps.setObject(2, "Sólo una prueba");
            ps.setObject(3, new Date());
            result = ps.executeUpdate();
            System.out.println("Insert Result: " + result);
        }
    }
}
```
