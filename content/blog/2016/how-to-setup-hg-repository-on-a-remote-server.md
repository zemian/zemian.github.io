Title: How to setup hg repository on a remote server
Date: 2016-06-14 00:00:00-05:00
Tags: hg


I love using mercurial source control! It's easy to use and it works as I expected everytime I need to do something with my source repository. Here is how you can quickly create a remote repository to push your existing project into it. (use this as backup of your project or share among your team etc)

1. SSH into your remote server and create an empty repository.
```
ssh remote_hostname
bash> cd $HOME 
bash> mkdir -p hg-repos/myproject
bash> cd hg-repos/myproject
bash> hg init
```
2. Back on your local machine and in your existing hg project, edit the .hg/hgrc file with the following:
```
[paths]
default=ssh://remote_hostname/hg-repos/myproject
[ui]
remotecmd=/usr/local/bin/hg
```
That's it! You don't even need hg server running in remote host to make this work! Now you may perofrm "hg push" command inside your local project to sync up to remote host 

NOTE 1: This setup rely on your SSH into remote host. If you want to avoid user password promt everytime you perform "hg push", then setup Key-Based SSH login.

NOTE 2: You only need "remotecmd" part if your remote_hostname does not have a standard hg installed. Then you can specified your custom location here.

NOTE 3: If you want to use abolute path for "default" path instead, then you can use double slash after the "remote_hostname". Else the single slash is relative to your $HOME directory.

