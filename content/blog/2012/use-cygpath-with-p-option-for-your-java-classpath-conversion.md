Title: Use cygpath with -p option for your Java CLASSPATH conversion
Date: 2012-11-15 00:00:00-05:00
Tags: cygwin


I just noticed that Cygwin's `cygpath` command supports `-p` option. This is a real gem when writing Java wrapper script that needs to covert CLASSPATH values. A simple script can demonstrate the purpose.

```
    #!/usr/bin/env bash
    # Author: Zemian Deng, date: 2012-11-16T00:00:00-05:00
    #
    # run.sh - A simple Java wrapper script for Cygwin and Unix/Linux shell. We assume 
    # this script is located in a subdiretory inside the application home directory.
    # Example:
    #   app/bin/run.sh
    #   app/config/log4j.properties
    #   app/lib/log4j.jar
    # Usage:
    #   bash> run.sh app.Hello
    #
    DIR=$(cd "$(dirname $0)/.." && pwd)
    CP=${CP:="$DIR/config:$DIR/lib/*"}
    if [[ "$OS" == Windows* ]]; then
     CP=$(cygpath -mp $CP)
    fi
    java -cp "$CP" "$@"
```

