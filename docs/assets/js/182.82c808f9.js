(window.webpackJsonp=window.webpackJsonp||[]).push([[182],{563:function(a,e,r){"use strict";r.r(e);var s=r(10),t=Object(s.a)({},(function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("p",[r("a",{attrs:{href:"https://docs.python.org/3/howto/argparse.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://docs.python.org/3/howto/argparse.html"),r("OutboundLink")],1)]),a._v(" "),r("p",[a._v("The python doc for "),r("a",{attrs:{href:"https://docs.python.org/3.4/library/argparse.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("argparse"),r("OutboundLink")],1),a._v("module didn't provide enough examples on the usage. I also think the module and parser itself is TOO flexible, in that the add_argument function accept too many parameters and it's confusing to use.")]),a._v(" "),r("p",[a._v("In most cases, you would define structure of your program's input with two parts: Your program actual arguments and optional parameters. Then you would invoke the parser and use the result as a dict (Namespace) like object.")]),a._v(" "),r("p",[a._v("Here are few examples that demonstrate how to use it in few common cases.")]),a._v(" "),r("p",[a._v("Example0: Handle raw arguments")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[a._v("import sys\nargs = sys.argv[1:]\n\n\nfor name in args:\n\n  print(name)\n")])])]),r("p",[a._v("Example1: Handle 2 arguments and a boolean option")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[a._v("import argparse\nparser = argparse.ArgumentParser()\nparser.add_argument('hostname', default='localhost')\nparser.add_argument('port', default=12345, type=int)\nparser.add_argument('-d', default=False, action='store_true')\nargs = parser.parse_args()\n\nif args.d:\n print(\"Processing host %s on port %d\" % (args.hostname, args.port))\n")])])]),r("p",[a._v("Example2: Handle 1 argument with many options")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[a._v("import argparse\nparser = argparse.ArgumentParser()\nparser.add_argument('url')\nparser.add_argument('-u', '--user', help='user', default='demo')\nparser.add_argument('-p', '--password', help='user password', default='demo123')\nparser.add_argument('-l', '--limit', help='max limit value', default=1000, type=int)\nparser.add_argument('--payload', help='text file payload', default='payload.xml')\nargs = parser.parse_args()\n\nprint(\"Processing url %s\" % args.url)\n\nuser, password = args.user, args.password\nprint(\"Got option user=%s\" % user)\n\nwith open(args.payload) as fh:\n  payload = fh.read()\n\nif args.limit > 100:\n  print(\"Limit has exceed 100\")\n")])])]),r("p",[a._v("Example3: Handle one or more arguments with a boolean option")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[a._v("import argparse, fileinput\nparser = argparse.ArgumentParser()\nparser.add_argument('files', metavar='FILE', nargs='+')\nparser.add_argument('-d', default=False, action='store_true')\nargs = parser.parse_args()\n\nfor line in fileinput.input(args.files):\n  if args.d:\n    print(\"Processing line: %s\" % line, end='')\n")])])]),r("p",[a._v("To display the default values in the helppage, do this with the parser")]),a._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[a._v("parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)\n")])])])])}),[],!1,null,null,null);e.default=t.exports}}]);