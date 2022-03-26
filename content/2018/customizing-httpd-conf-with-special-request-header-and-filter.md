---
title: Customizing httpd conf with special request header and filter
date: 2018-02-26T00:00:00-05:00
tags:
  - httpd
  - proxy
  - filter
---

## How to setup httpd reverse proxy for Tomcat

Enable modules
```
	# NOTE: If you are using Cygwin, these module requires cygserver to run!
	#       else you get the following error:
	#
	#[Mon Feb 26 09:26:50.308620 2018] [proxy:crit] [pid 7564] (88)Function not implemented: AH02478: #failed to create proxy mutex
	#AH00016: Configuration Failed
	#
	LoadModule proxy_module modules/mod_proxy.so
	LoadModule proxy_http_module modules/mod_proxy_http.so
```

Setup reverse proxy
```
	# Reverse Proxy Setup
	# NOTE: The ending slash '/' is important!
	<IfModule proxy_module>
	ProxyPass "/"  "http://localhost:8080/"
	ProxyPassReverse "/"  "http://localhost/"
	</IfModule>
```

## How to add custom headers to requests

Enable modules

	LoadModule headers_module modules/mod_headers.so

Add headers to all requests

	<Location "/">
		# Add custom headers
		RequestHeader set appuser "test"
		# Or add custom headers based on env variables exist
		RequestHeader set appuser2 "%{APPUSER}e" env=APPUSER
	</Location>


## How to setup Httpd Filter

Enable modules

	LoadModule ext_filter_module modules/mod_ext_filter.so
	LoadModule request_module modules/mod_request.so


Windows Example
```
	# Setup external script to run request filter
	ExtFilterDefine my-filter mode=input \
		cmd="C:/Python36/pythonw.exe C:/Apache24/cgi-bin/my-filter.py"
	<Directory  "cgi-bin">
		SetInputFilter my-filter
	</Directory>
```

Cygwin Example
```
	# Setup external script to run request filter
	ExtFilterDefine my-filter mode=input \
		cmd="/usr/bin/python3 /srv/www/cgi-bin/my-filter/my-filter.py"
	<Directory  "/srv/www/cgi-bin/my-filter">
		SetInputFilter my-filter
	</Directory>
```

File my-filter.py
```
	#!/usr/bin/python3
	import datetime
	log = '/var/log/httpd/my-filter.log'
	with open(log, 'a') as file:
		file.write(f'{datetime.datetime.now()} hello filter\n')
```

File my-filter2.py
```
	#!/usr/bin/python3
	import datetime, sys, os
	log = '/var/log/httpd/my-filter.log'
	with open(log, 'a') as file:
		file.write(f'## {datetime.datetime.now()} hello filter\n')
		file.write(f'arguments: {sys.argv}\n')
		file.write(f'STDOIUT:\n')
		for line in sys.stdin:
			file.write(f'{line}\n')
		file.write(f'os.environments:\n')
		for k,v in os.environ.items():
				file.write(f'os.env: {k} = {v}\n')
```
