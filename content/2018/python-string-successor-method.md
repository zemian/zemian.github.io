---
title: Python string successor method
date: 2018-08-24T00:00:00-05:00
tags:
  - python
  - string
---

```python
# A simple implementation of Ruby's String#next() successor method in Python
# See https://ruby-doc.org/core-2.4.1/String.html#method-i-next
def next(id_template, id_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"):
        first_ch = id_chars[0]
        last_ch = id_chars[-1]
        new_id = list(id_template)

        idx = len(new_id) - 1
        while idx >= 0:
                ch = new_id[idx]
                if ch == last_ch:
                        new_id[idx] = first_ch
                else:
                        next_idx = id_chars.index(ch) + 1
                        new_id[idx] = id_chars[next_idx]
                        break
                idx -= 1

        return ''.join(new_id)

# Tests
import unittest
class StringNextTest(unittest.TestCase):
        def test_next(self):
                self.assertEqual(next("0"), "1");
                self.assertEqual(next("9"), "A");
                self.assertEqual(next("A"), "B");
                self.assertEqual(next("Y"), "Z");
                self.assertEqual(next("Z"), "0");

                self.assertEqual(next("AAA"), "AAB");
                self.assertEqual(next("AAB"), "AAC");
                self.assertEqual(next("AAC"), "AAD");
                self.assertEqual(next("ZZ0"), "ZZ1");
                self.assertEqual(next("ZZ1"), "ZZ2");
                self.assertEqual(next("ZZ2"), "ZZ3");
                self.assertEqual(next("ZZY"), "ZZZ");
                self.assertEqual(next("ZZZ"), "000");
                self.assertEqual(next("ZZZZZZ"), "000000");
                self.assertEqual(next("ZZZZZZZZZ"), "000000000");

                self.assertEqual(next("ABC999GHI"), "ABC999GHJ");
                self.assertEqual(next("ABC999GZZ"), "ABC999H00");

        def samples(self):
                id = "ZZX"
                print(id)
                for i in range(10):
                        id = next(id)
                        print(id)

                id = "FF9"
                print(id)
                for i in range(10):
                        id = next(id, "0123456789ABCDEF")
                        print(id)

if __name__ == '__main__':
        #StringNextTest().samples()
        unittest.main()
```