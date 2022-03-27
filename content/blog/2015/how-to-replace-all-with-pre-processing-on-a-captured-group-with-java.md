Title: How to replace all with pre-processing on a captured group with Java
Date: 2015-06-12 00:00:00-05:00
Tags: java,regex


Need to replace all occurances of a pattern text and replace it with a captured group? Something like this in Java works nicely:

        
        String html = "<a href='myurl?id=1123'>myurl</a>\n" +
                "<a href='myurl2?id=2123'>myurl2</a>\n" +
                "<a href='myurl3?id=3123'>myurl3</a>";
        html = html.replaceAll("id=(\\w+)'?", "productId=$1'");

Here I swapped the query name from "id" to "productId" on all the links that matched my criteria. But what happen if I needed to pre-process the captured ID value before replacing it? Let's say now I want to do a lookup and transform the ID value to something else?

This extra requirement would lead us to dig deeper into Java RegEx package. Here is what I come up with:

```
import java.util.regex.*;
...
    public String replaceAndLookupIds(String html) {
        StringBuffer newHtml = new StringBuffer();
        Pattern p = Pattern.compile("id=(\\w+)'?");
        Matcher m = p.matcher(html);
        while (m.find()) {
            String id= m.group(1);
            String newId = lookup(id);
            String rep = "productId=" + newId + "'";
            m.appendReplacement(newHtml, rep);
        }
        m.appendTail(newHtml);
        return newHtml.toString();
    }
```  

