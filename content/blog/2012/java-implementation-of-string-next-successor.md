Title: Java implementation of String#next() successor
Date: 2012-12-31 00:00:00-05:00
Tags: java



I've found the [Ruby's `String#next()` or `#succ`](http://www.ruby-doc.org/core-1.9.3/String.html#method-i-succ) very useful and productive, specially when generating data for testing. Here is what the Ruby doc says:

> succ -> new_str
> 
> next -> new_str
> 
> Returns the successor to str. The successor is calculated by incrementing characters starting from the rightmost alphanumeric (or the rightmost character > if there are no alphanumerics) in the string. Incrementing a digit always results in another digit, and incrementing a letter results in another letter > of the same case. Incrementing nonalphanumerics uses the underlying character sets collating sequence.
> 
> If the increment generates a carry, the character to the left of it is incremented. This process repeats until there is no carry, adding an additional > character if necessary.
> 
>     "abcd".succ        #=> "abce"
>     "THX1138".succ     #=> "THX1139"
>     "<<koala>>".succ   #=> "<<koalb>>"
>     "1999zzz".succ     #=> "2000aaa"
>     "ZZZ9999".succ     #=> "AAAA0000"
>     "***".succ         #=> "**+"
>     

So when I saw Groovy actually has provided a [String extension `#next()`](http://groovy.codehaus.org/groovy-jdk/java/lang/String.html#next()) method, I was happy to try it out. But then I was quickly disappointed when the behavior is very different. The Groovy version is very simple and actually not very productive since it simply [loop through Character set range in incrementally](https://github.com/groovy/groovy-core/blob/master/src/main/org/codehaus/groovy/runtime/StringGroovyMethods.java) (including non-printable characters blindly!). The Ruby's version, however, is much more productive since it produce visible characters. For examples:

```
    bash> ruby -e 'puts "Z".next()'
    AA
    bash> groovy -e 'println("Z".next())'
    [
```    

I wish Groovy version would improve in future as it's not very useful at the moment. Just for fun, I wrote a Java implementation version that mimics the Ruby's behavior:

And here is my unit test for sanity check:

