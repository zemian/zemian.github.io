Title: How to Trust a Self-Signed SSL certificate on MacOS
Date: 2021-04-17
Tags: macos,SSL-certificate,self-signed



Sometimes we use a self-sign certificate on web server for development. If you are
using a MacOS system, you would need the following to get pass the Trust certificate.

1. Visit the site and the click the URL icon to show the Certificate.

2. Drag the certificate onto the Desktop and save it as `.cer` file.

3. Open "Keychain Access" app and import the `.cer` file.

4. Double click the import cerficate and expand "Trust" selection and set to "Always Trust"

5. Save and exit "Keychain Access"

6. Restart browser (eg: Chrome) and revisit site again. 

NOTE: If you don't restart browser, the certificate will continue to fail!

