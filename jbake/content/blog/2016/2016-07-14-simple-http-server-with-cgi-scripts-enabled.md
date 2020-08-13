title=Simple http server with CGI scripts enabled
date=2016-07-14
type=post
tags=python
status=published
~~~~~~
If you want to experiment some python code as CGI script to serve by a HTTP server,
you can get started by these steps:

1. Create a `cgi-bin` directory.
2. Ready!

No, really, it's that simple! Try these CGI scripts out.

## 
Example 1: `cgi-bin/hello.py`

    #!/usr/bin/env python3
    
    localvars_table = ''
    for x in dir():
      localvars_table += '%s' % x
    localvars_table += ''
    
    print("Content-type: text/html")
    print("")
    print("""
    Hello World! Your custom CGI script is working. Here are your current Python local variables.
    
    %s
    
    NOTE: If you want to write useful CGI script, try the Python 'cgi' module. See cgitest.py script.
    """ % (localvars_table))
    

To test and run this, you simply invoke these couple commands:

    bash> chmod a+x cgi-bin/hello.py
    bash> python3 -m http.server --cgi
    

You may now test it on your browser with [http://localhost:8000/cgi-bin/hello.py](http://localhost:8000/cgi-bin/hello.py). Hit `CTRL+C` to stop the server.

If you want to do more with fancy CGI scripts, try the Python's `cgi` module. Here is another example.

## 
Example 2: `cgi-bin/cgitest.py`

    #!/usr/bin/env python3
    
    import cgi
    cgi.test()
    

Again `chmod` your `cgitest.py` script and visit [http://localhost:8000/cgi-bin/cgitest.py](http://localhost:8000/cgi-bin/cgitest.py). You will see all the
HTTP related data as expected when working with a CGI script. See [https://docs.python.org/3/library/cgi.html](https://docs.python.org/3/library/cgi.html)
for more details.