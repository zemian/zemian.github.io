Title: Be aware of the count - 0 when using Python's re.sub() to find and replace text
Date: 2015-08-23 00:00:00-05:00
Tags: python


I have an xml file and I want to remove a whole section of element without actually parsing the XML file. I wrote an Python script to do just that. I first tested it out like this:

```
import re
input_text = open('my.xml').read()
result = re.findall(r'<library-ref>.*</library-ref>', input_text, re.S)
print(result)
```

The result IS what I wanted, so I thought I can quickly replace it with something like this:

	result = re.sub(r'<library-ref>.*</library-ref>', '', input_text, re.S)

And to my surprise this does not work. It took me a while to notice that I mis used the method according to the documentation, which has this signature:

	re.sub(pattern, repl, string, count=0, flags=0)

At first glace, I thought that count is already default to zero and I do not need to set it, but because that is a positional parameter, you must include it! So you suppose to call it explicit like this:

	result = re.sub(r'<library-ref>.*</library-ref>', '', input_text, 0, re.S)

Or, if you like, you can use the "flags" parameter name explicitly without the odd looking zero.

	result = re.sub(r'<library-ref>.*</library-ref>', '', input_text, flags=re.S)

So here is an example of flexible dynamic typing of optional parameters can bite if you are not careful.

