---
title: Installing a local downloaded .rpm file
date: 2016-06-26T00:00:00-05:00
tags:
  - linux
---
To install:
    
    bash> sudo yum install <package_name.rpm>

If you have problem installing it due to gpg check failure and you know it's a good RPM, then try with this.

    bash> sudo yum --nogpgcheck localinstall <package_name.rpm>

To verify what's in the rpm:
    
    bash> rpm -qlp <package_name.rpm>
