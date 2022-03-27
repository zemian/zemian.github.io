Title: How to manage SQL statements more effectively with Java
Date: 2015-07-22 00:00:00-05:00
Tags: java,sql


If you work with plain Java JDBC without any external libraries, you will need to manage your own SQL statements. Unfortunately Java String does not support muti-lines construct, and you have to use many "quotes" + "concatenation" and makes the SQL very hard to read and manage. This makes it hard to maintain and test (try to copy a SQL from Java code into your SQL client). It would be so nice to keep the entire SQL block of text intact without these Java noise.

Here is a solution. Store your SQL queries in XML inside CDATA:

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sqlMap>
    <sqls>
        <entry>
            <key>getUser</key>
            <value><![CDATA[
SELECT *
FROM USERS
WHERE ID = ?
            ]]></value>
        </entry>
        <entry>
            <key>getSpecialCodeByUserId</key>
            <value><![CDATA[
SELECT u.EMAIL, p.ID as PROFILEID, p.SPECIALCODE, a.MANAGERID
FROM USERS u
  LEFT JOIN PROFILE p ON p.USERID = u.ID
  LEFT JOIN ACCOUNT a ON a.PROFILEID = p.ID
WHERE u.ID = ?  ]]></value>
        </entry>  </sqls>
</sqlMap>
```

Now you just need to read it. One way to do this is with built-in JAXB

```
import javax.xml.bind.annotation.XmlRootElement;
import java.util.HashMap;
import java.util.Map;

@XmlRootElement
public class SqlMap {
    Map<String, String> sqls = new HashMap<>();

    public Map<String, String> getSqls() {
        return sqls;
    }

    public void setSqls(Map<String, String> sqls) {
        this.sqls = sqls;
    }

    public String getSql(String name) {
        return sqls.get(name);
    }

    public static SqlMap load(String name) throws Exception {
        InputStream inStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(name);
        SqlMap sqlMap = JAXB.unmarshal(inStream, SqlMap.class);
        return sqlMap;
    }
}
```

Another way is to simply use java.util.Properties#loadFromXML by following their schema DTD. Here is an example of XML:

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <comment>XML Props</comment>
    <!-- Foo entry -->
    <entry key="foo">bar</entry>
    <!-- Query entry -->
    <entry key="query">
        <![CDATA[
                SELECT * FROM USERS
        ]]>
    </entry>
</properties>
```

Both of these are built-in from your JDK!

