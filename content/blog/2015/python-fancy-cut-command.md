Title: python fancy cut command
Date: 2015-07-09 00:00:00-05:00
Tags: python


```
# file: cut.py

#
# Python port of the following perl command (fancy cut command)
#   ls -l | tail -n +2 | perl -F'/\s+/' -ane 'print "$F[-1]\n"'
# but it works better with python index slicer and split by full regex delimiter.
#
# Examples:
#   ls -l | tail -n +2 | python cut.py ':'
#   ls -l | tail -n +2 | python cut.py '2:3'

import sys,fileinput,re
indexes = sys.argv[1]
files = sys.argv[2:]
for line in fileinput.input(files):
words = re.split("\s+", line.strip())
print(eval("words[" + indexes + "]"))

```

