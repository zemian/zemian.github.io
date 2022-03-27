Title: Print Python Runtime Information
Date: 2018-03-22 00:00:00-05:00
Tags: python



```python
# Print python runtime information
import os, sys
print(f"CWD={os.getcwd()}")
print(f"Python={sys.version}")
paths = '\n'.join(sys.path)
print(f"Lib={paths}")
```
