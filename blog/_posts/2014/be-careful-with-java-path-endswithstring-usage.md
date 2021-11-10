---
title: Be careful with Java Path.endsWith(String) usage
date: 2014-04-15T00:00:00-05:00
tags:
  - java
---
If you need to compare the java.io.file.Path object, be aware that Path.endsWith(String) will ONLY match another sub-element of Path object in your original path, not the path name string portion! If you want to match the string name portion, you would need to call the `Path.toString()` first. For example
```
// Match all jar files.
Files.walk(dir).forEach(path -> {
if (path.toString().endsWith(".jar"))
System.out.println(path);
});
```
With out the "`toString()`" you will spend many fruitless hours wonder why your program didn't work.
