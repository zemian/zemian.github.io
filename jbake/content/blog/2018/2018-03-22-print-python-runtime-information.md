---
title: Print Python Runtime Information
date: 2018-03-22
tags:
  - python
---

    # Print python runtime information
    import os, sys
    print(f"CWD={os.getcwd()}")
    print(f"Python={sys.version}")
    paths = '\n'.join(sys.path)
    print(f"Lib={paths}")
