Title: How to turn off IntelliJ autoformat on a block of code
Date: 2018-02-23 00:00:00-05:00
Tags: intellij



When doing bug fix on old codes, you want least possible change set as
possible. The IntelliJ IDE by default will auto reformat your code upon
a `}` character you type. (Example: when you add a try/finally block to
an existing block of code, then it will reformat that block of code base
on IDE’s Code Style you configured.) If you have legacy code, they’re
most likely formatted differently than your IDE style, and it will make
unnessary changes. This is not what you want during bug fix. So to turn
it off, you can do this:

For, IntelliJ 2017.3, go to Menu
`File > Settings > Editor > General > Smark Keys`, then uncheck
`Reformat block  on typing '}'` item.

