Title: How to fix IntelliJ OutOfMemoryError
Date: 2018-01-19 00:00:00-05:00
Tags: intellij



If you have a large project, you might get this error when trying to do
a full build

    Error:java: OutOfMemoryError: insufficient memory

You can fix this by increase memory in two places in the IDE. For
example, let says you want to increase to 2GB of memory:

1.  Update the `idea64.exe.vmoptions` file with `-Xmx2048m` to increase
    Java max heap memory size for your IDE. (Require IDE restart)

2.  Go to IDE menu: File &gt; Settings … &gt; Build, Execution,
    Deployment &gt; Compiler &gt; "Build process heap size (Mbytes):"
    and increase it to `2000`.

