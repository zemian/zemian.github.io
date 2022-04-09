---
title: Git Branch name with 'slash'
date: 2016-10-09T00:00:00-05:00
tags:
  - git
---

Git allows you to use `/` slash in your branch name. It’s useful for
grouping branches. However, you need to be careful that once a slashy
branch name is created, you can’t use its name as the "base" for another
new nested slash name! For example:

    # this is fine
    git branch foo/bar
    git branch foo/bar2

    # but this fails
    git branch foo/bar/cool
    fatal: cannot lock ref 'refs/heads/foo/bar/cool': 'refs/heads/foo/bar' exists; cannot create 'refs/heads/foo/bar/cool'

    # So to use two level of slashes, you must first start a branch with two slashes!
    git branch foo2/bar/cool
    git branch foo2/bar/cool2
    git branch foo2/bar2/cool
    git branch foo2/bar2/cool2

Here is a more concrete example. Let’s say you worked on an `issue-123`
branch, and now you are done but want to rename under a subcategory
`closed/issue-123`. If you were to create a bsranch `closed` first, then
the rename will fail! You have to first ensure `closed` branch does not
exist. In fact reate a `closed/zkeepme` first, then you can always move
your completed branch into that sub category!
