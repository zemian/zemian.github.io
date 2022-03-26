---
title: Simple Variable Substitution in Java String
date: 2012-10-24T00:00:00-05:00
tags:
  - java
---

When I wrote about how to improve the Java Properties class using [Props](https://zemian.github.io/2012/09/improving-javautilproperties.html), I've shown
a feature where you can use variable substition such as `mypath=${user.home}` in your config file. The implementation underneath it uses the Apache Common Lang library with `org.apache.commons.lang.text.StrSubstitutor`. There is nothing wrong with this, but I was curious how bad would it be to remove such dependency, so the `Props` can be more standalone.

Here is a quick implementation in Groovy, but you should able to translate to Java easily.

```
    // String variable substitutions
    def parseVariableNames(String text) {
        def names = []
        def pos = 0, max = text.length()
        while (pos < max) {
            pos = text.indexOf('${', pos)
            if (pos == -1)
                break
            def end = text.indexOf('}', pos + 2)
            if (end == -1)
                break
            def name = text.substring(pos + 2, end)
            names.add(name)
            pos = end + 1
        }
        return names
    }
    def replaceVariable(String key, String value, String text) {
        //println "DEBUG: Replacing '${key}'' with '${value}'"
        result = text.replaceAll('\\$\\{' + key + '}', value)
        return result
    }
```    

Probably not the most efficient thing, but it should work. Let's have some tests.

```
    // Test
    def map = ["name": "Zemian", "id": "1001"]
    def inputs  = [
        'Hello ${name}',
        'My id is ${id}',
        '${name} is a good programmer.',
        '${name}\'s id is ${id}.'
    ]
    
    result = inputs.collect{ line ->
        def names = parseVariableNames(line)
        names.each{ key ->
            line = replaceVariable(key, map.get(key), line) 
        }
        line
    }
    assert result == [
        'Hello Zemian',
        'My id is 1001',
        'Zemian is a good programmer.',
        'Zemian\'s id is 1001.'
    ]
```    

The output should print nothing, as it passed the test. What do you think?
