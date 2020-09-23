---
title: A simple cron wrapper script with logging
date: 2014-06-04T00:00:00-05:00
tags:
  - crontab
---
When working with crontab service, one thing I often need is to capture the ouput of the job. Having the job script aware of this output and logging is tedious, and often make the script harder to read. So I wrote a shell wrapper that will redirect all job script's STDOUT into a log file. This way I can inspect it when a job has run and the job script can just focus on the task itself. 
```
# file: runcmd.sh
# Helper/wrapper script to run any command in the crontab env. This script will ensure
# user profile script is loaded and to log any command output into log files. It also
# ensure not to print anything to STDOUT to avoid crontab system mail alert.
#
# NOTE: be sure to pass in absolute path of the command to be run so it can be found.
#
# Usage:
#   ./runcmd.sh find $HOME/crontab/test.sh            # Simple use case
#   LOG_NAME=mytest ./runcmd.sh $HOME/crontab/test.sh # Change the log name to something specific
#

# Options
DIR=`dirname $0`
CMD="$@"
CMD_NAME=`basename $1`
LOG_NAME=${LOG_NAME:=$CMD_NAME}
LOG="$DIR/logs/$LOG_NAME.log`date +%s`"

# Ensure logs dir exists
if [[ ! -e $DIR/logs ]]; then
        mkdir -p $DIR/logs
fi

# Run cron command
source $HOME/.bash_profile
echo "`date` Started cron cmd=$CMD, logname=$LOG_NAME" >> $LOG 2>&1
$CMD >> $LOG 2>&1
echo "`date` Cron cmd is done." >> $LOG 2>&1
```
With this wrapper, you can run any shell script and their output will be recorded. For example this job script below will clean up the logs accumulated in our logs folder.

Note that the wrapper will also auto source the ".bash_profile". Often this this is needed if your job script expect all the env variables you already have setup in your login shell scripts.
```
# file: remove-crontab-logs.sh
DIR=`dirname $0`/logs
echo "Checking and removing logs in $DIR"
find $DIR -type f -mtime +31 -print -delete
echo "Done"
```
Now in the crontab file, you may run the job script like this:
```
# Clean up crontab logs
@montly $HOME/crontab/runcmd.sh $HOME/crontab/remove-crontab-logs.sh

```
