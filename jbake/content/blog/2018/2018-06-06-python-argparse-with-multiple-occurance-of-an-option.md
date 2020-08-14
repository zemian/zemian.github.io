---
title: Python argparse with multiple occurance of an option
date: 2018-06-06
tags:
  - python-argparse
---

**test.py.**

    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("prog_args", nargs='*')
    parser.add_argument("-e", action='append')
    args = parser.parse_args()
    prog_args = args.prog_args
    env = dict([e.split('=') for e in args.e])

    print(f"Program args: {prog_args}")
    print(f"Env options: {env}")

**Example.**

    $ python3 test.py one two three -ek1=1 -e k2=foo
    Program args: ['one', 'two', 'three']
    Env options: {'k1': '1', 'k2': 'foo'}
