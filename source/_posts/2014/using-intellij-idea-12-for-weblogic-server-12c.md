---
title: Using Intellij IDEA 12 for WebLogic Server 12c
date: 2014-02-01T00:00:00-05:00
tags:
  - intellij
  - weblogic
---
If you want to explore the latest EE features, you would need WebLogic Server 12c. However if you still have the IDEA 12 Ultimate edition, you will quickly find that it only supports up to WebLogic 
Server 11g (10.x)! However you can still make your IDEA 12 U to work with WLS 12c, and all you need is an extra "registry.xml" file under WLS home directory (eg: C:/apps/wls12120/registry.xml). This file will allow the IDEA to pickup and recognize your latest WLS 12c installation.
```
<?xml version="1.0" encoding="UTF-8"?>
<bea-product-information>
  <host home="C:\apps\wls12120" name="${env.HOST}">
    <product format="1.0" name="WebLogic Platform">
      <release level="12.0"
        ServicePackLevel="6" PatchLevel="0"
        Status="installed" BeaProgramGroup="BEA WebLogic Platform 12.0" StartMenu=""
        InstallTime="@INSTALL_TIME@"
        InstallDir="C:\apps\wls12120\wlserver"
        JavaHome="C:\apps\jdk7" JavaVersion="1.7.0" JavaVendor="@JAVA_VENDOR@">
        <component name="WebLogic Server" version="12.1.2.0">
          <component name="Server"/>
          <component name="Server Examples"/>
        </component>
     </release>
    </product>
 </host>
</bea-product-information>
```
I have learned this from reading the IntelliJ forum. Also note that the latest IDEA 13 will support WebLogic Server 12c out of the box now.

