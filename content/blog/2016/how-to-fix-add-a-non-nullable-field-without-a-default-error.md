Title: How to fix 'add a non-nullable field ... without a default' error
Date: 2016-06-26 00:00:00-05:00
Tags: django



Error example:

    (mypy) Zemians-Air:crmsite zemian$ ./manage.py makemigrations

You are trying to add a non-nullable field 'created_dt' to customer without a default; we can't do that (the database needs something to populate existing rows).

The reason this will happen if you already have a migration file that created the table first and then you create 2nd migration file that try to add new fields. The tool is not smart enough to know you don't have data there yet, and must require you to provide default data!

Solution: if this is brand new table you are creating, manually remove the previous migration files and let it generate a complete one! Or if you already have table exists and it's during development, you can drop your table and recreate your migration files. Else if you have production table exist, you definitely want to address this with a default value in order to migrate successfully.

