---
title: JavaScript Jdbc Quick Test
date: 2015-09-09
tags:
  - javascript
  - jdbc
---
importPackage(java.sql)
url = "jdbc:mysql://localhost/test";
username = "test";
password = "test123";

// Util for nice print of result
function printResultSet(rs) {
colCount = rs.getMetaData().getColumnCount();
while (rs.next()) {
for (i=1; i <= colCount; i++) {
printf("%s\t", rs.getObject(i));
}
println();
}
}

// Get a DB conn
sql = "SELECT * FROM ztest_issues";
conn = DriverManager.getConnection(url, username, password);

// Example of simple query
st = conn.createStatement();
rs = st.executeQuery(sql);
while (rs.next()) {
for (i=1; i <= 4; i++) {
printf("%s\t", rs.getObject(i));
}
println();
}
st.close();

// Example of prepared statment with binding params
sql = "SELECT * FROM ztest_issues WHERE title=?";
st = conn.prepareStatement(sql);
st.setObject(1, "test");
rs = st.executeQuery();
printResultSet(rs);
st.close();

// Close DB conn
conn.close();