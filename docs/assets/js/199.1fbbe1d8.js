(window.webpackJsonp=window.webpackJsonp||[]).push([[199],{581:function(a,n,t){"use strict";t.r(n);var e=t(10),s=Object(e.a)({},(function(){var a=this,n=a.$createElement,t=a._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("p",[a._v("Here is how I setup a local instance of Trac (a python based issue tracking web application) on my Mac.")]),a._v(" "),t("p",[a._v("Prerequisite: MySQL 5.6 and Python 2.7 (Python3 will not work with Trac yet!)")]),a._v(" "),t("p",[a._v("Step1: Setup a Trac database and a user")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[a._v("sql> CREATE DATABASE trac DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;\nsql> CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev123';\nsql> GRANT ALL ON trac.* TO 'dev'@'localhost';\n\n\nStep2: Install MySQL adaptor for Python and Trac\n\nbash> pip install Genshi trac mysqlclient\n\n\nStep3: Setup a Track instance\n\nbash> trac-admin /Users/zemian/dev/mytrac intent\n\nbash> # Above will prompt you to enter a backend string. Use\nbash> # this connection string: \n\nbash> #   mysql://dev:dev123@localhost:3306/trac\n\nStep3: Create a Trac admin user\n\nbash> htpasswd -c /Users/zemian/dev/mytrac/.htpasswd admin\n\nStep4: Run Track\n\nbash> tracd -p 8000 --basic-auth=\"mytrac,/Users/zemian/dev/mytrac/.htpasswd,mytrac\" /Users/zemian/dev/metric\n")])])])])}),[],!1,null,null,null);n.default=s.exports}}]);