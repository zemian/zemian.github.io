Title: Reduce recent project list size in IntelliJ
Date: 2018-03-07 00:00:00-05:00
Tags: intellij



When opening a project from IntelliJ IDE, it will give you a list of
menu that contains your recent projects. This list however has default
of 50 items max, and sometimes I find it stretched the menu popup too
long and covered some of IDE the status line (which I need to verify the
project path to be open). It’s a pity that there is obvious normal IDE
Settings to change this, but today I found a post that shows how you can
do it this:

1.  Go to menu: `Help->Find Action->Registry`

2.  In the diablog table, find the "ide.max.recent.projects" key entry
    and change the value to your liking (eg: `10`)

Ref:
<https://intellij-support.jetbrains.com/hc/en-us/community/posts/207089089-SOLVED-Where-do-I-set-the-maximum-number-of-recent-projects-to-be-shown-in-the-File-Open-Recent-list>-

