---
title: Hg shortcuts for bash .profile
date: 2013-02-28T00:00:00-05:00
tags:
  - bash
---
Some shortcuts I used most often when working with Mecurial (hg) source control.

```    
    # Hg shortcuts
    function splithgfiles() { ruby -ne 'if $_ =~ /files: / then puts $_.split else puts $_ end' ; }
    alias hgpu='hg pull -u'
    alias hgl='hg log -v -l 5 | splithgfiles'
    alias hgl1='hg log -v -l 1 | splithgfiles'
    alias hgu='hg update'
    alias hgc='hg commit -m'
    alias hgb='hg branches'
    alias hgbm='hg bookmarks'
    alias hgt='hg tags'
    alias hgs='hg status'
    alias hgsu='echo "# Summary" && hg summary && echo "# Heads" && hg heads'
    alias hgr='hg revert -C'
    
    # Remove unversion files from Hg repository dir.
    function hgrmnew {
     rm -vfr `hg st | cut -d ' ' -f 2`
    }
```

One worth special mentioning is that default "hg log -v" shows files with space separator. I find it easier to view with one file per line instead, hence I added the "splithgfiles" helper function.
