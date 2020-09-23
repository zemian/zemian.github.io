---
title: How to import SSL cert into WLS DemoTrust.jks keystore file
date: 2016-07-05T00:00:00-05:00
tags:
  - weblogic
---

In WLS, you can import your own SSL cert into its trust keystore file to invoke "https" contents. Here is how you do that with the default WLS `DemoTrust.jks` file.

    bash> cd $WL_HOME/server/lib
    bash> keytool -keystore DemoTrust.jks -storepass DemoTrustKeyStorePassPhrase -list
    bash> keytool -keystore DemoTrust.jks -storepass DemoTrustKeyStorePassPhrase -importcert -alias mycert -file mycert.pem
    
    # Or to delete the entry
    bash> keytool -keystore DemoTrust.jks -storepass DemoTrustKeyStorePassPhrase -delete -alias mycert

The file `mycert.pem` can be obtained by any modern browser when you visit the "https" site. For example using Firefox, you can follow these steps to export the cert file:

1. Click on the Lock icon next to the URL in the broswer

2. Click More Information button, then go to the "Security Tab"

3. Click View Certificate button, then go to the Details tab

4. Click Export &#8203; button

5. On the bottom right corner dropdown, select X.509 Cerificate with chain (PEM)

6. Type name of file to save (eg: `mycert.pem`) and then click Save button
