(window.webpackJsonp=window.webpackJsonp||[]).push([[190],{572:function(t,n,e){"use strict";e.r(n);var s=e(10),r=Object(s.a)({},(function(){var t=this.$createElement,n=this._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[this._v('importPackage(java.sql)\nurl = "jdbc:mysql://localhost/test";\nusername = "test";\npassword = "test123";\n\n// Util for nice print of result\nfunction printResultSet(rs) {\ncolCount = rs.getMetaData().getColumnCount();\nwhile (rs.next()) {\nfor (i=1; i <= colCount; i++) {\nprintf("%s\\t", rs.getObject(i));\n}\nprintln();\n}\n}\n\n// Get a DB conn\nsql = "SELECT * FROM ztest_issues";\nconn = DriverManager.getConnection(url, username, password);\n\n// Example of simple query\nst = conn.createStatement();\nrs = st.executeQuery(sql);\nwhile (rs.next()) {\nfor (i=1; i <= 4; i++) {\nprintf("%s\\t", rs.getObject(i));\n}\nprintln();\n}\nst.close();\n\n// Example of prepared statment with binding params\nsql = "SELECT * FROM ztest_issues WHERE title=?";\nst = conn.prepareStatement(sql);\nst.setObject(1, "test");\nrs = st.executeQuery();\nprintResultSet(rs);\nst.close();\n\n// Close DB conn\nconn.close();\n')])])])])}),[],!1,null,null,null);n.default=r.exports}}]);