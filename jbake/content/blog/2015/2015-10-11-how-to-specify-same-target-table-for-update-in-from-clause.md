---
title: How to specify SAME target table for update in FROM clause
date: 2015-10-11
tags:
  - mysql
---
Have you tried updating something simple as following?

update category_tmp set last_update=NOW() 
where category_id in (
  select category_id from category_tmp where name like 'A%'
);

In MySQL you will get an error like this:

Error Code: 1093. You can't specify target table 'category_tmp' for update in FROM clause.

So it says that you can't use the same update TABLE name within the sub query in where condition. The trick to get around this is to use another sub query in the where clause so it won't see the TABLE name being used! Here is a workaround:

update category_tmp set last_update=NOW() 
where category_id in (
  select category_id from (
    select category_id from category_tmp where name like 'A%'
  ) ID_LIST
);

Noticed that in MySQL, you must name your sub query result such as ID_LIST, in order for it to be re-select it again on the outer query! Otherwise it will error out with this:

Error Code: 1248. Every derived table must have its own alias