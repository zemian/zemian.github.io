---
title: jQuery doesn't suport ajax over the file protocol
date: 2011-05-29
tags:
  - jquery
---
I was playing with jQueryUI today, and a simple example like this failed to update an page.

        $.get('data1.xml', function(data) {
            $('#main-panel').html(data)
        });

Running under Firefox4 locally on a PC (static local file protocols), I get errors like this inside Firebug:

    
    Node cannot be inserted at the specified point in the hierarchy"  code: "3
    
    fragment.appendChild( ret[i] ); jquery.js (line 6134)
    

Turns out that this failure only occur when fetching local files because the same code works when deployed and run from a web server. Reading from a bug report here http://bugs.jqueryui.com/ticket/7225 seems to indicate that jQuery AJAX doesn't support local file protocol.

Interestingly, an IE browser works with above code! And also the jQuery's load method like $('#main-panel').load('data1.xml'); works fine with local file!