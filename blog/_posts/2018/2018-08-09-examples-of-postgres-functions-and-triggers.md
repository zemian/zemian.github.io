---
title: Examples of Postgres Functions and Triggers
date: 2018-08-09T00:00:00-05:00
tags:
  - postgres
  - function
  - trigger
---

    -- Simple Function
    create or replace function rand_range(a int, b int) returns int
    as $$
      -- return a random range of int between a and b, both inclusive!;
      select cast(floor(random()*((b + 1)-a)+a) as int);
    $$ language sql;
    select rand_range(1, 10);
    select rand_range(90, 95) from generate_series(1, 10);

    -- Function to print message on DB server
    create or replace function print_msg(msg text, lev text default 'notice') returns void
      as $$
      begin
        case
          when lev = 'debug' then
            raise debug '%', msg;
          when lev = 'info' then
            raise info '%', msg;
          else
            raise notice '%', msg;
        end case;
      end;
    $$ language plpgsql;
    select print_msg('hello world');

    -- Log Function
    drop table log;
    create table log(
      id serial,
      msg text not null,
      ts timestamptz default current_timestamp not null,
      category varchar(50) default 'INFO' not null,
      user_id varchar(50) default 'system' not null,
      source_info text null
    );
    create or replace function add_log(
      msg text,
      category varchar(50) default 'INFO'
    ) returns void
    as $$
    begin
      insert into log(msg, category, source_info, user_id)
        values(msg, category, 'client=' || inet_client_addr(), current_user);
    end;
    $$ language plpgsql;

    select add_log('hello2');
    select public.add_log('hello3');
    select * from log;

    -- Triggers to log data entry or update
    drop table test;
    create table test(id serial, f1 real);
    create or replace function log_test_update() returns trigger
    as $$
    begin
      perform add_log('Insert or Update on test table');
      return NEW;
    end
    $$ language plpgsql;
    create trigger test_logging_trigger
      after insert or update on test
      for each row
      execute procedure log_test_update();
    insert into test(f1) values(0.10), (0.20), (0.30);
    update test set f1 = 3.5 where id = 1;
    select * from test;
    select * from log;
