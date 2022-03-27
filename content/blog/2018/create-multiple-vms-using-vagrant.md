Title: Create multiple VMs using Vagrant
Date: 2018-05-19 00:00:00-05:00
Tags: vagrant,virtualbox,vm,ubuntu



Vagrant is a great tool to automate and setup VMs. Here is a config file
that can setup multiple VMs in your own PC to simulate a
controller(admin), db, and app servers farm env. I will setup so that
it’s ready to install Ansible in a the control server, and ensure all
other servers is accessible by a private virtual IP with default python
executable.

1.  Install VirtualBox and Vagrant in your development PC. (These two
    requires elevated admin rights!)

2.  Now as normal user open a terminal and run the following:

        $ mkdir vm-serversfarm
        $ vagrant init ubuntu/xenial64

Now edit `Vagrantfile` with the following:

```ruby
# This file is to setup Ubuntu VM servers
Vagrant.configure("2") do |config|
  vm_box = "ubuntu/xenial64"
  config.vm.define "admin" do |admin|
    admin.vm.box = vm_box
    admin.vm.hostname = 'ubuntu-xenial-admin'
    admin.vm.network "private_network", ip: "192.168.56.200"
    admin.vm.provision "shell", privileged: false,
      inline: <<-SCRIPT_DOC
        ssh-keygen -f ~vagrant/.ssh/id_rsa -t rsa -N ''
        cp -v ~vagrant/.ssh/id_rsa.pub /vagrant/admin_id_rsa.pub
      SCRIPT_DOC
    admin.vm.provision "shell",
      inline: <<-SCRIPT_DOC
        apt-get update
        apt-get install -y ansible
      SCRIPT_DOC
  end

  config.vm.define "db1" do |db1|
    db1.vm.box = vm_box
    db1.vm.hostname = 'ubuntu-xenial-db1'
    db1.vm.network "private_network", ip: "192.168.56.211"
    db1.vm.provision "shell", inline: "cat /vagrant/admin_id_rsa.pub >> ~vagrant/.ssh/authorized_keys"
    db1.vm.provision "shell",
      inline: <<-SCRIPT_DOC
        #apt-get update
        apt-get install -y python
        apt-get install -y postgresql
      SCRIPT_DOC
  end

  config.vm.define "app1" do |app1|
    app1.vm.box = vm_box
    app1.vm.hostname = 'ubuntu-xenial-app1'
    app1.vm.network "private_network", ip: "192.168.56.221"
    app1.vm.provision "shell", inline: "cat /vagrant/admin_id_rsa.pub >> ~vagrant/.ssh/authorized_keys"
    app1.vm.provision "shell",
      inline: <<-SCRIPT_DOC
        #apt-get update
        apt-get install -y python
      SCRIPT_DOC
  end

  config.vm.define "app2" do |app2|
    app2.vm.box = vm_box
    app2.vm.hostname = 'ubuntu-xenial-app2'
    app2.vm.network "private_network", ip: "192.168.56.222"
    app2.vm.provision "shell", inline: "cat /vagrant/admin_id_rsa.pub >> ~vagrant/.ssh/authorized_keys"
    app2.vm.provision "shell",
      inline: <<-SCRIPT_DOC
        #apt-get update
        apt-get install -y python
      SCRIPT_DOC
  end
end
```

Now you can bring them up by running just this command:

    $ vagrant up

When all is done, you may ssh into any box by their name like this

    $ vagrant ssh admin
    $ # Or any of other boxes: db1, app1, app2

Using CentOS VMs
================
```ruby
# This file is to setup CentOS VM servers
Vagrant.configure("2") do |config|
  vm_box = "generic/centos7"

  # Server app1 is the admin server. We will also host the DB server here.
  config.vm.define "app1" do |app1|
    app1.vm.box = vm_box
    app1.vm.hostname = 'app1'
    app1.vm.network "private_network", ip: "192.168.56.201"
    app1.vm.synced_folder ".", "/vagrant_data"
    app1.vm.provision "shell", inline: <<-SCRIPT_DOC
      yum install -y python-virtualenv python36 ansible postgresql
    SCRIPT_DOC
    app1.vm.provision "shell", privileged: false, inline: <<-SCRIPT_DOC
      ssh-keygen -f ~vagrant/.ssh/id_rsa -t rsa -N ''
      cp -v ~vagrant/.ssh/id_rsa.pub /vagrant_data/app1_id_rsa.pub
    SCRIPT_DOC
  end

  # Server app2 is a application workhorse server
  config.vm.define "app2" do |app2|
    app2.vm.box = vm_box
    app2.vm.hostname = 'app2'
    app2.vm.network "private_network", ip: "192.168.56.202"
    app2.vm.synced_folder ".", "/vagrant_data"
    app2.vm.provision "shell", inline: <<-SCRIPT_DOC
      yum install -y python36
    SCRIPT_DOC
    app2.vm.provision "shell", privileged: false, inline: <<-SCRIPT_DOC
      cat /vagrant_data/app1_id_rsa.pub >> ~vagrant/.ssh/authorized_keys
      chmod 600 ~vagrant/.ssh/authorized_keys
      chmod 700 ~vagrant/.ssh
    SCRIPT_DOC
  end

  # Server app3 is a application workhorse server
  config.vm.define "app3" do |app3|
    app3.vm.box = vm_box
    app3.vm.hostname = 'app3'
    app3.vm.network "private_network", ip: "192.168.56.203"
    app3.vm.synced_folder ".", "/vagrant_data"
    app3.vm.provision "shell", inline: <<-SCRIPT_DOC
      yum install -y python36
    SCRIPT_DOC
    app3.vm.provision "shell", privileged: false, inline: <<-SCRIPT_DOC
      cat /vagrant_data/app1_id_rsa.pub >> ~vagrant/.ssh/authorized_keys
      chmod 600 ~vagrant/.ssh/authorized_keys
      chmod 700 ~vagrant/.ssh
    SCRIPT_DOC
  end
end
```

