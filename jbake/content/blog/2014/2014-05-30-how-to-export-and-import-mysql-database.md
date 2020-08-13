title=How to export and import MySQL database
date=2014-05-30
type=post
tags=mysql
status=published
~~~~~~
You can export the MySQL database with schema table definitions and data separated. Here is a simple bash shell script that will export an database.

# file: database-export.sh
DB_NAME=mydb
DB_SCHEMA_FILE=mydb.sql
DB_DATA_FILE=mydb-data.sql
DB_USERNAME=root
DB_PASSWORD=secret

# export schema only from mysql 
echo "`date` Exporting database $DB_NAME schema to $DB_SCHEMA_FILE"
mysqldump --no-data --routines -u $DB_USERNAME -p$DB_PASSWORD $DB_NAME > $DB_SCHEMA_FILE

# export data only from mysql
echo "`date` Exporting database $DB_NAME data to $DB_DATA_FILE"
mysqldump --single-transaction --quick --no-autocommit --no-create-info --extended-insert=false -u $DB_USERNAME -p$DB_PASSWORD $DB_NAME > $DB_DATA_FILE

echo "`date` Done."

The schema export with "--routines" will export stored proc as well. When exporitng data you have to be little more careful. The "--single-transaction" will ensure your data is good. The "--no-autocommit" can really speed up your import later on certain OS.

Now to import these files back, you can create an empty database and then run the following.

# file: database-import.sh 
# import schema and data into mysql
echo "`date` Importing Schema $DB_SCHEMA_FILE into $DB_NAME"
mysql -f -u $DB_USERNAME -p$DB_PASSWORD $DB_NAME < $DB_SCHEMA_FILE
echo "`date` Importing DATA $DB_DATA_FILE into $DB_NAME"
mysql -f -u $DB_USERNAME -p$DB_PASSWORD $DB_NAME < $DB_DATA_FILE

echo "`date` Done."

The import with "-f" option will allow you to continue even if you already have duplicated data in the tables; it will simply ignore and continue.

These two combo commands will allow you to quicly backup and restore a MySQL database.

Enjoy.

PS: I have come to learn that "mysqldump" with procedures will insert an extra line like "DEFINER 'user'@'hostname'", and it may create problem if you use different users to export/import or even run the application! Unfortunately there is no exclude from the "mysqldump" tool. So you have to manually strip that off if that's creating a problem for you.

mysqldump --no-data --routines -u $DB_USERNAME -p$DB_PASSWORD $DB_NAME | perl -pi -e 's/DEFINER="\w+"@"\w+" //g' > $DB_SCHEMA_FILE

You can vote the issue here: [http://bugs.mysql.com/bug.php?id=24680](http://bugs.mysql.com/bug.php?id=24680)