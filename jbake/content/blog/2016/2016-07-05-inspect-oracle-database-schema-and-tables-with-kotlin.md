title=Inspect Oracle Database Schema and Tables with Kotlin
date=2016-07-05
type=post
tags=kotlin
status=published
~~~~~~

    // Filename: conn.kts
    // Usage: kotlinc -cp /home/zedeng/Downloads/ojdbc7.jar -script conn.kts

    import java.sql.*

    Class.forName("oracle.jdbc.driver.OracleDriver")
    val conn = DriverManager.getConnection("jdbc:oracle:thin:@myremotehost:1521:MYDB", "system", "mypassword123")

    println("Database connection established $conn")
    println("Database Default Catalog: ${conn.getCatalog()}")
    println("Database Default Schema: ${conn.getSchema()}")

    val m = conn.getMetaData()
    println("${m.getDatabaseProductName()} ${m.getDatabaseMajorVersion()} ${m.getDatabaseMinorVersion()}")

    println("List of Schemas")
    var rs: ResultSet
    rs = m.getSchemas()
    while(rs.next()) {
        println("  ${rs.getObject(1)}")
    }
    rs.close()

    val listSchemaName = conn.getSchema()
    println("List of Tables for ${listSchemaName}")
    rs = m.getTables(conn.getCatalog(), listSchemaName, null, null)
    while(rs.next()) {
        val name = rs.getObject("TABLE_NAME")
        println("  $name")
    }
    rs.close()

    println("Execute query:")
    val stmt = conn.createStatement()
    rs = stmt.executeQuery("SELECT 1+1 FROM DUAL")
    while(rs.next()) {
        val v = rs.getObject(1)
        println("  1 + 1 from DB=$v")
    }
    rs.close()
    stmt.close()

    conn.close()
