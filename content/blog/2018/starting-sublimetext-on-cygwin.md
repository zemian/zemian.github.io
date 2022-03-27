Title: Starting SublimeText on Cygwin
Date: 2018-04-09 00:00:00-05:00
Tags: sublimetext,cygwin,editor



I edit files a lot from command line Cygwin, and I usually use an alias
`e` to my favorite editor. For SublimeText, I found it more useful to
start a new windows on files I pass in like this:

    function subl() { "/C/Users/zemian/apps/Sublime-Text-Build-3143-x64/subl.exe" --new-window $(cygpath -am "$@") ; }
    alias e=subl

Now in terminal, I can edit any files by simply running this: 

    $ e ~/.bashrc

