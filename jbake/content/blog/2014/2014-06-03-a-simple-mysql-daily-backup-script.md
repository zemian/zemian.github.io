---
title: A simple MySQL daily backup script
date: 2014-06-03
tags:
  - mysql
  - backup
---
Using the MySQL export script I've showed from [last post](http://saltnlight5.blogspot.com/2014/05/how-to-export-and-import-mysql-database.html) (assume you saved it in a file named "$HOME/database-export.sh"), you may now perform a daily backup with your crontab service like this.

#file: mysql-backups.sh
DIR=`dirname $0`
echo "Backup DB with export script."
$DIR/database-export.sh

echo "Moving exported files into backup dir."
DB_BAK_DIR=$HOME/mysql-backups/`date +%a`
echo "Removing old file (if exists) and saving new backup into $DB_BAK_DIR"
if [[ -e $DB_BAK_DIR ]]; then
  rm -fv $DB_BAK_DIR/*
else
  mkdir -p $DB_BAK_DIR
fi
cp -v $DIR/*.sql $DB_BAK_DIR

This script should create a daily folder under your home directory, for example like "$HOME/mysql-backups/Mon", "Tue", "Wed" etc. It should save up to 7 days in a week if you run this with a daily cron job.

# crontab -e
@daily $HOME/mysql-backups.sh > /dev/null 2>&1

This is not the most robust way of backing up your DB, but it's a simple solution if you just want something quick up and running without worry too much.