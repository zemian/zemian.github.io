---
title: Example of plain Jdbc Support Class
date: 2015-06-05
tags:
  - java
  - jdbc
---
Need to fetch some data from DB quickly with Java? Here is a quick example of plain JDBC JdbcSupport  Class to help you.

package zemian.jdbcexample

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public abstract class JdbcSupport {
    private static final Logger LOGGER = LoggerFactory.getLogger(JdbcSupport.class);

    protected DataSource dataSource;

    public JdbcSupport(DataSource dataSource) throws Exception {
        this.dataSource = dataSource;
    }

    protected Row toRowMap(ResultSet rs) throws Exception {
        Row row = new Row();
        ResultSetMetaData meta = rs.getMetaData();
        int count = meta.getColumnCount();
        for (int i=1; i <= count; i++) {
            row.map.put(meta.getColumnName(i), rs.getObject(i));
        }
        return row;
    }

    protected List<Row> queryRowList(Connection conn, String sql, Object... params) throws Exception {
        LOGGER.debug("Query sql={}, params={}", sql, Arrays.asList(params));
        List<Row> result = new ArrayList<>();
        try(PreparedStatement st = conn.prepareStatement(sql)) {
            for (int i = 1; i <= params.length; i++) {
                st.setObject(i, params[i -1]);
            }
            try (ResultSet rs = st.executeQuery()) {
                while(rs.next()) {
                    result.add(toRowMap(rs));
                }
            }
        }
        return result;
    }

    protected Row queryRow(Connection conn, String sql, Object... params) throws Exception {
        List<Row> rowList = queryRowList(conn, sql, params);
        if (rowList.size() != 1) {
            throw new RuntimeException("No unique result from query.");
        }
        return rowList.get(0);
    }
    
    public static class Row {
        public Map<String, Object> map = new HashMap<>();

        public <T> T get(String name) {
            T result = (T)map.get(name);
            return result;
        }

        public <T> T get(String name, T defVal) {
            T result = (T)map.get(name);
            if (result == null)
                return defVal;
            return result;
        }
    }
}

To use it, one may do something like this:

public class AccountStore extends JdbcSupport {
    public AccountStore(DataSource dataSource) {
        super(dataSource);
    }
    
    public void printAccountProfiles() {
        try(Connection conn = dataSource.getConnection()) {
            String sql = "SELECT ACCOUNTID FROM USERS WHERE USERNAME=?";
            Row row = queryRow(conn, sql, "zemian");
            
            String accountId = row.get("ACCOUNTID");
            String department = "IT";
            sql = "SELECT * FROM ACCOUNTPROFILES WHERE ID=? AND DEPARTMENT=?";
            List<Row> rowList = queryRowList(conn, sql, accountId, department);
            
            for (Row row : rowList) {
                System.out.println("Got profile: " + row.map);
            }
        }
    }
}