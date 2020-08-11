title=Migrating Django 1.6 to 1.9
date=2016-07-06
type=post
tags=django
status=published
~~~~~~

Couple years ago, I wrote a simple Events and Signin management app
using django 1.6. It was fun to write and it worked really well. Just
recently I have to write another quick simple CRM webapp and I decided
to use Django again, but they current release is 1.9 now and I quickly
found few differences.

-   The `INSTALLED_APPS` now takes `AppCofig` instead of package name.
    And there is a new `apps.py` file for it.

-   There is now `makemigration` and `migrate` command to create
    database table.
