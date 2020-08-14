---
title: How to parse Python command arguments and options
date: 2015-07-23
tags:
  - python
---
https://docs.python.org/3/howto/argparse.html

The python doc for [argparse ](https://docs.python.org/3.4/library/argparse.html)module didn't provide enough examples on the usage. I also think the module and parser itself is TOO flexible, in that the add_argument function accept too many parameters and it's confusing to use.

In most cases, you would define structure of your program's input with two parts: Your program actual arguments and optional parameters. Then you would invoke the parser and use the result as a dict (Namespace) like object.

Here are few examples that demonstrate how to use it in few common cases.

Example0: Handle raw arguments

    import sys
    args = sys.argv[1:]
    

    for name in args:

      print(name)

Example1: Handle 2 arguments and a boolean option

    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('hostname', default='localhost')
    parser.add_argument('port', default=12345, type=int)
    parser.add_argument('-d', default=False, action='store_true')
    args = parser.parse_args()
    
    if args.d:
     print("Processing host %s on port %d" % (args.hostname, args.port))
    

Example2: Handle 1 argument with many options

    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('url')
    parser.add_argument('-u', '--user', help='user', default='demo')
    parser.add_argument('-p', '--password', help='user password', default='demo123')
    parser.add_argument('-l', '--limit', help='max limit value', default=1000, type=int)
    parser.add_argument('--payload', help='text file payload', default='payload.xml')
    args = parser.parse_args()
    
    print("Processing url %s" % args.url)
    
    user, password = args.user, args.password
    print("Got option user=%s" % user)
    
    with open(args.payload) as fh:
      payload = fh.read()
    
    if args.limit > 100:
      print("Limit has exceed 100")
    
    

Example3: Handle one or more arguments with a boolean option

    import argparse, fileinput
    parser = argparse.ArgumentParser()
    parser.add_argument('files', metavar='FILE', nargs='+')
    parser.add_argument('-d', default=False, action='store_true')
    args = parser.parse_args()
    
    for line in fileinput.input(args.files):
      if args.d:
        print("Processing line: %s" % line, end='')
    

To display the default values in the helppage, do this with the parser

    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    