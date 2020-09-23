title=Git clone failed with SSL certificate problem
date=2018-03-03
type=post
status=published
~~~~~~

Problem:

    git clone https://github.com/notepad-plus-plus/notepad-plus-plus
    Cloning into 'notepad-plus-plus'...
    fatal: unable to access 'https://github.com/notepad-plus-plus/notepad-plus-plus/': SSL certificate problem: unable to get local issuer certificate

Solution:

    git config --global http.sslVerify false
    # then retry above command
