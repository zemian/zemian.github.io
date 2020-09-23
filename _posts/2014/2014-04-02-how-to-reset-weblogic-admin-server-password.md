---
title: How to reset WebLogic admin server password
date: 2014-04-02T00:00:00-05:00
tags:
  - weblogic
---

If you forgot your admin user password for WebLogic, you can reset it this way. Ensure you are in the domain directory first! 
```   
source $WL_HOME/server/bin/setWLSEnv.sh 

cd mydomain
mv security/DefaultAuthenticatorInit.ldift security/DefaultAuthenticatorInit.ldift.bak

java weblogic.security.utils.AdminAccount <admin_username> <new_password> security
```
