---
title: What does UTF-8 with BOM mean?
date: 2012-11-02T00:00:00-05:00
tags:
  - string
  - utf8
---

Believe it or not, There is no such thing as Plain Text!

All files in a modern Operating Sytems (Windows, Linux, or MacOSX) are saved with an encoding scheme! They are encoded (a table mapping of what each byte means) in such way so that other programs can read it back and understand how to get information out. It happens that US/ASCII encoding is earliest and widely used that people think it's just "Plain Tex". But even ASCII is an encoding! It uses 7 bits in mapping all US characters in saving the bytes into file. Obviously you are free to use any kind of encoding (mapping) scheme to save any files, but if you want other programs to read it back easily, then sticking to some standard ones would help a lot. Without an agreed upon encoding, programs will not able to read files and be any useful!

The most useful and practical file encoding today is "UTF-8" because it support Unicode, and it's widely used in internet.

I discovered something odd when using Eclipse and Notepadd++. In Ecilpse, if we set default encoding with UTF-8, it would use normal UTF-8 without the Byte Order Mark (BOM). But in Notepad++, it appears to support UTF-8 wihtout BOM, but it won't recoginze it when first open. You can check this by going Menu > Encoding and see which one is selected. Notepad++ seems to only recognize UTF-8 wihtout BOM with ones it converted by it's own conversion utility. Perhaps it's a bug in notepad++.

So what is BOM? The byte order mark is useless for UTF-8. They only used for UTF-16 so they know which byte order is first. But UTF-8 will allow you to save these BOM for conversion purpose... they are ineffective in encoding the doc itself. So a "normal" UTF-8, it won't have BOM, but Windows would like to use them anyway. The Windows NOTEPAD would automatically save BOM in UTF-8!

So be-aware when viewing UTF-8 without BOM encoding files in Notepad++, as it can be deceiving at first glance.

Ref: 

[http://en.wikipedia.org/wiki/UTF-8](http://en.wikipedia.org/wiki/UTF-8) 

[http://www.joelonsoftware.com/articles/Unicode.html](http://www.joelonsoftware.com/articles/Unicode.html)
