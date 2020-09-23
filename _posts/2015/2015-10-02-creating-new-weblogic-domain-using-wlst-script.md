---
title: Creating new WebLogic domain using WLST script
date: 2015-10-02T00:00:00-05:00
tags:
  - weblogic
---
Here is how to creating new WebLogic domain using WLST script without starting up a WebLogic server instance. The default AdminServer console login username is `weblogic`, and the script allow you to change its password and a port number for the AdminServer instance.

```
# Usage: wlst.cmd createDomain.py <domain_home> <port> <password>
# Example: 
#   cd D:\apps\wls1036_dev\wlserver\common\bin
#   wlst.cmd scripts\createDomain.py C:\data\wls11g_domains\dev 7001 weblogic1

import os, sys, os.path
domain_home, port_s, password = sys.argv[1:]

port = int(port_s)
domain_home = os.path.abspath(domain_home)
domain_name = os.path.basename(os.path.normpath(domain_home))
template = "%s/wlserver/common/templates/domains/wls.jar" % os.environ['MW_HOME']

print("Creating WLS domain: %s" % domain_name)
# MW_HOME should be auto set by wlst.cmd script
readTemplate(template)

# Set domain name
set('Name', domain_name)

# Set AdminServer port 
cd('Servers/AdminServer')
set('ListenAddress','')
set('ListenPort', port)

# Set weblogic password
cd('/Security/%s/User/weblogic' % domain_name)
cmo.setPassword(password)

# Write domain
#setOption('OverwriteDomain', 'true')
writeDomain(domain_home)
closeTemplate()
exit()
```
