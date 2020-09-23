---
title: How to setup .ssh folder permissions
date: 2018-05-24T00:00:00-05:00
tags:
  - ssh
  - linux
---

How to setup .ssh folder permissions
====================================

    chmod 700 ~/.ssh                # (drwx------)
    chmod 600 ~/.ssh/authorized_key # (-rw-------)
    chmod 600 ~/.ssh/id_rsa         # (-rw-------)
    chmod 644 ~/.ssh/id_rsa.pub     # (-rw-r--r--)
    chmod 755 ~                     # (drwxr-xr-x)

ref:
<https://superuser.com/questions/215504/permissions-on-private-key-in-ssh-folder>
