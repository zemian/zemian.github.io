Title: Python processing each line from stdin or files
Date: 2015-07-11 00:00:00-05:00
Tags: python



```
import fileinput,re
for line in fileinput.input():
line=line.rstrip()
line=line.replace('\\', '/')
a,b,*_=re.split('\s+', line)
print(b)
```

