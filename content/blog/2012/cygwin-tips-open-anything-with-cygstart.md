Title: Cygwin tips - open anything with cygstart
Date: 2012-12-13 00:00:00-05:00
Tags: cygwin


Cygwin has this cool command called `cygstart`, and I usually alias it as `open`.
 

    
    alias open='cygstart'
    

 
Here are few things I use often:

    
     
    # bring up Windows Explore with folder open
    bash> open /cygdrive/c/temp
    bash> open "$USERPROFILE"
     
    # bring up browser on a url
    bash> open http://google.com
     
    # bring up any windows program by file extension
    bash> open /cygdrive/c/my.docx
    

Because I use a Cygwin terminal shell a lot, I have many alias shortcuts to many different directories. The `open .` allows me to jump to any directory and starts the Windows Explore with that directory expanded quickly. You can see more options with `open --help`.

