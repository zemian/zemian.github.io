---
title: Python cat program
date: 2015-07-24T00:00:00-05:00
tags:
  - python
---
You can implement the Linux cat program with few lines of Python code.

```
import fileinput
for line in fileinput.input():
    print(line, end='')
```

Then I was tinkering with this, and wanted to add an option to display the filename if multiple files were given. Here is how I use argparse module for this. Not the most efficient code and prob overkill, but it works!

```
import fileinput, argparse
parser = argparse.ArgumentParser()
parser.add_argument('files', nargs='+', metavar='FILE', help='files to concatenate or print')
parser.add_argument('-n', action='store_true', help='show filename')
args = parser.parse_args()
with fileinput.input(files=args.files) as finput:
    for line in finput:
        if (args.n and finput.isfirstline()):
            print('\n=== {0} ==='.format(finput.filename()))
        print(line, end='')
```

Note that argparse not only just parse for options, but actual argument list as well, and you have to explicitly define it, so you may reference it after the parse.
