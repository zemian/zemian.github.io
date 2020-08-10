title=How to install Zoom conference on Ubuntu 14.04 LTS
date=2016-06-17
type=post
tags=linux
status=published
~~~~~~
1. Download latest zoom_2.0.52458.0531_amd64.deb package from https://zoom.us/download

2. Run  
bash> sudo dpkg -i zoom_2.0.52458.0531_amd64.deb

3. Even though the package installed complete, you will see error messages if you have a 64-bit OS because Zoom has other dependencies that's not met. And the above command will setup the apt-get to auto fetch the failed dependencies if you simply run the following next:
bash> sudo apt-get -f install

That's it! Your zoom should be ready to go! Try to start Zoom by press Super + A, then type in "Zoom". 

Extra: To Verify Installation, you may run:
bash> dpkg -l |grep zoom

UPDATE:

The exact same steps can be used to install the Skype skype-ubuntu-precise_4.3.0.37-1_i386.deb on Ubuntu.

NOTE: If you have errors running steps above, it's very likely you have upgraded your kernel or added extra repositories into apt-get that's causing all the package dependencies conflict. Try to revert back to original Ubuntu 14.04 install state and these steps should get you running!