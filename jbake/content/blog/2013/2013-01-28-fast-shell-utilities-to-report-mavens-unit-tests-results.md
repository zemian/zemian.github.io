---
title: Fast shell utilities to report Maven's unit tests results
date: 2013-01-28
tags:
  - maven
---

I would like to share couple shell utilities that I have collected. These are for fast Maven multi modules reporting from your unit tests results, without having you to run entire Maven site reports, which can take a LONG time to generate if you have a large project! They should work on Linux or Window's Cygwin shell.

    # Show failed tests among all the surefire results.
    function failedtests() {
        for DIR in $(find . -maxdepth 3 -type d -name "surefire-reports") ; do
            ruby -ne 'puts "#$FILENAME : #$&" if $_ =~ /(Failures: [1-9][0-9]*.*|Errors: [1-9][0-9]*.*)/' $DIR/*.txt
        done
    }
    
    # Show the top tests that took the longest time to run from maven surefire reports
    function slowtests() {
        FILES=''
        for DIR in $(find . -maxdepth 3 -type d -name "surefire-reports") ; do
            FILES="$FILES $DIR/*.txt"
        done
        head -q -n 4 $FILES \
            | ruby -ne 'gets; print $_.chomp + " "; gets; print gets' \
            | ruby -ane 'printf "%8.03f sec: ", $F[-2].to_f; puts $_' \
            | sort -r \
            | head -10
    }
    

When developing with Maven, you often want to see a summary of failed tests, and you want those surefire TXT file content to see what's going on. The `failedtests` function will give you a list of all the failed tests filenames in all modules; and then you can cat each one to investigate.

With `slowtests` function you may quickly see the top 10 most time consuming tests from your project!

Enjoy!

---

## Updated (2013/01/30)

I found out that the `head` command on MacOSX doesn't have the "-q" option and it always prints the "==> filename `# Replace this
head -q -n 4 $FILES \

# With this
ruby -e 'ARGV.each{ |n| File.open(n) {|f| 4.times{ puts f.readline}} }' $FILES \
`
It's a tad longer, but it's PORTABLE!