title=Setup MySQL DataSource on WLS
date=2015-10-04
type=post
tags=weblogic, mysql
status=published
~~~~~~
Here is a WLST script to setup MySQL DataSource in WebLogic server after you have created a domain. The script will also assign this DataSource to one or more servers you pass in at the end of arguments.

# Update an existing domain to setup a DataSource and assign it to servers
# Example
#   wlst.cmd setupDataSource.py C:\data\wls11g_domains\dev MYTESTDB jdbc/MYTESTDB com.mysql.jdbc.Driver jdbc:mysql://localhost/mytestdb test test123 AdminServer

import os, sys, os.path
(domain_home, ds_name, jndi_name, driver_name, url, user, password) = sys.argv[1:8]
servers = sys.argv[8:]

domain_home = os.path.abspath(domain_home)

readDomain(domain_home)

print("Setting up WLS DataSource: %s" % ds_name)
create(ds_name, 'JDBCSystemResource')
cd('/JDBCSystemResource/%s/JdbcResource/%s' %(ds_name, ds_name))
create('myJdbcDriverParams','JDBCDriverParams')
cd('JDBCDriverParams/NO_NAME_0')
set('DriverName',driver_name)
set('URL', url)
set('PasswordEncrypted', password)
set('UseXADataSourceInterface', 'false')
create('myProps','Properties')
cd('Properties/NO_NAME_0')
create('user', 'Property')
create('characterEncoding', 'Property')
create('connectionCollation', 'Property')
create('useUnicode', 'Property')
cd('Property/user')
cmo.setValue(user)
cd('../characterEncoding')
cmo.setValue('utf-8')
cd('../connectionCollation')
cmo.setValue('utf8_general_ci')
cd('../useUnicode')
cmo.setValue('true')

cd('/JDBCSystemResource/%s/JdbcResource/%s' %(ds_name, ds_name))
create('myJdbcDataSourceParams','JDBCDataSourceParams')
cd('JDBCDataSourceParams/NO_NAME_0')
set('JNDIName', java.lang.String(jndi_name))

cd('/')
for server in servers:
print("Assigning DS to server: %s" % server)
assign('JDBCSystemResource', ds_name, 'Target', server)

updateDomain()
exit()