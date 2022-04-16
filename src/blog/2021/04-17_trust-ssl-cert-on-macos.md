---
title: How to Trust a Self-Signed SSL Certificate on MacOS
date: 2021-04-17
tags:
- macos
- ssl-certificate
---

Sometimes we use a [self-sign certificate]({% link_to '/blog/2021/how-to-create-self-signed-ssl-certificate-for-apache' %}) on web server for development. On most of the OS and browser, it will prompt and alert you that you are at risk to accept this certificate because it does not have known `CA` authority signed. And that's okay since you often use this for testing anyway, so you would normally just "Accept" the risk and "Proceed" anyway. The browser will let you continue as normal.

However if you are using a MacOS system, it will not let you proceed! You would need the following to get pass the Trust certificate in order to proceed.

1. Visit the site and the click the URL icon to show the Certificate.

2. Drag the certificate onto the Desktop and save it as `.cer` file.

3. Open "Keychain Access" app and import the `.cer` file.

4. Double click the import cerficate and expand "Trust" selection and set to "Always Trust"

5. Save and exit "Keychain Access"

6. Restart browser (eg: Chrome) and revisit site again. 

NOTE: If you don't restart browser, the certificate will continue to fail!
