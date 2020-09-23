title=Create simple WLS domain using WLST and built-in template jar
date=2015-09-25
type=post
tags=weblogic
status=published
~~~~~~

You can easily [start up a WebLogic Server](http://saltnlight5.blogspot.com/2014/01/getting-started-with-weblogic-server.html) on an empty directory and it will create a domain. Here is another way to create WLS domain structure folder without actually starting up a WLS server.

# Usage: wlst.cmd createDomain.py <domain_home> <port> <password>

# NOTE: the <domain_home> must be a absolute path.

# Example: C:\wls12130\wlserver\common\bin\wlst.cmd scripts\createDomain.py C:\data\wls12c_domains\dev 7001 weblogic1

import os, sys

domain_home = sys.argv[1]
domain_name = 'mydomain'

port = int(sys.argv[2])

password = sys.argv[3]

readTemplate(os.environ['MW_HOME'] + "/wlserver/common/templates/wls/wls.jar")

cd('/Server/AdminServer')

set('Name', domain_name + '-admin')

set('ListenAddress','')

set('ListenPort', port)

cd('/Security/base_domain/User/weblogic')

cmo.setPassword(password)

cd('/')

set('Name', domain_name)

writeDomain(domain_home)

closeTemplate()

exit()