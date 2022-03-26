---
title: Taming those Java editors on MacOSX
date: 2012-08-26T00:00:00-05:00
tags:
  - editor
---

Today, I learned that you can open multiple Eclipse instances in MacOSX like this

    $ open -n -a Eclipse
    

This comes pretty handy if you want a separate workspace per large project that has dozen or so modules (try importing the Camel or SpringFramework 
project source and you will see what I mean!)

The `-a` is for name of an application to open, and `-n` means to open with new instance.

# Finding a programmer friendly text editor on MacOSX

Despite I use Eclipse for most of my large Java projects, I still often find myself the need of a plain text editor. I use plain text editor for most
of my scripting programming. I also use it for notes taking, text file browsing, or even writing Blog post in markdown format!

I guess for most programmers, choosing an Editor is a very personally thing. So I am not here to convert anybody. However, for those who never heard of 
[jEdit](http://www.jedit.org), you ought to give it a try. It's open source, full features, programmers friendly text editor that works 
across many of OS systems consistenly. It works because it's Java based! If you use one of decent computer now a day, the performance 
is excellent as well.

However, for some strange reason, the jedit installer on MacOSX doesn't comes with a normal java command line script wrapper. The only thing 
I can see is the actual binary under `/Applications/jEdit.app/Contents/MacOS/jedit`. We can certainly run this as full jedit command, but then 
it always liter the console with strange GUI warnings. So a better way to run it is actually to use the `open` command.

    $ open -a jedit $HOME/.bash_profile
    

Or you can add this in your `.bash_profile` file:

    function jedit(){ open -a jedit "$@" ; }
    

Now you can use `jedit` command on the terminal.

## Some of my favorite features of jEdit

- It's open source and has very active community of users.
- It works across MacOSX, Windows and Linux Desktop.
- Support many common programming language syntax highlights.
- Support multi columns editing.
- Support rich feature search (reg ex, hyper-search, all buffers search, search and replace etc.)
- Support multi buffers tabs editing.
- Supports Macro recording and scripting.
- Support plugin extension and there are many external plugins available (eg: XML formater, Diff viewer, SFTP client/editing, etc).

# Openning other stuff on MacOSX

The little `open` command can open not just application, but it can also open directories or files by extension associations. For
example, to configure any `.properties` files to be open by jEdit, try the the following.

1. Use Finder to browse and find one of properties
2. Right click, "Open With" > "Other..."
3. Choose "jEdit" under Applications folder.
4. Enable "Always Open With", then click Open button.

This change should affect your Terminal `open` command as well, and if you run `open my.properties`, your jEdit should pop up.

You can find more options by running it without any options, and it will print you full help page.

```
    Usage: open [-e] [-t] [-f] [-W] [-R] [-n] [-g] [-h] [-b <bundle identifier>] [-a <application>] [filenames] [--args arguments]
    Help: Open opens files from a shell.
          By default, opens each file using the default application for that file.  
          If the file is in the form of a URL, the file will be opened as a URL.
    Options: 
          -a                Opens with the specified application.
          -b                Opens with the specified application bundle identifier.
          -e                Opens with TextEdit.
          -t                Opens with default text editor.
          -f                Reads input from standard input and opens with TextEdit.
          -F  --fresh       Launches the app fresh, that is, without restoring windows. Saved persistent state is lost, excluding Untitled documents.
          -R, --reveal      Selects in the Finder instead of opening.
          -W, --wait-apps   Blocks until the used applications are closed (even if they were already running).
              --args        All remaining arguments are passed in argv to the application's main() function instead of opened.
          -n, --new         Open a new instance of the application even if one is already running.
          -j, --hide        Launches the app hidden.
          -g, --background  Does not bring the application to the foreground.
          -h, --header      Searches header file locations for headers matching the given filenames, and opens them.
```
