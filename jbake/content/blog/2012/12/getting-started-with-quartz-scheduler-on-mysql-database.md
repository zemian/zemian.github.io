title=Getting started with Quartz Scheduler on MySQL database
date=2012-12-14
type=post
tags=quartz
status=published
~~~~~~
Here are some simple steps to get you fully started with Quartz Scheduler on MySQL database using Groovy. The script below will allow you to quickly experiment different Quartz configuration settings using an external file.

First step is to setup the database with tables. Assuming you already have installed MySQL and have access to create database and tables.

    
    bash> mysql -u root -p
    
    sql> create database quartz2;
    sql> create user 'quartz2'@'localhost' identified by 'quartz2123';
    sql> grant all privileges on quartz2.* to 'quartz2'@'localhost';
    sql> exit;
    
    bash> mysql -u root -p quartz2 < /path/to/quartz-dist/docs/dbTables/tables_mysql.sql
    

The `tables_mysql.sql` can be found from Quartz distribution download, or directly from their source [here](http://svn.terracotta.org/svn/quartz/tags/quartz-2.1.6/docs/dbTables).

Once the database is up, you need to write some code to start up the Quartz Scheduler. Here is a simply Groovy script `quartzServer.groovy` that will run as a tiny scheduler server.

    
    // Run Quartz Scheduler as a server
    // Author: Author: Zemian Deng, Date: 2012-12-15_16:46:09
    @GrabConfig(systemClassLoader=true)
    @Grab('mysql:mysql-connector-java:5.1.22')
    @Grab('org.slf4j:slf4j-simple:1.7.1')
    @Grab('org.quartz-scheduler:quartz:2.1.6')
    import org.quartz.*
    import org.quartz.impl.*
    import org.quartz.jobs.*
    
    config = args.length > 0 ? args[0] : "quartz.properties"
    scheduler = new StdSchedulerFactory(config).getScheduler()
    scheduler.start()
    
    // Register shutdown
    addShutdownHook {
      scheduler.shutdown()
    }
    
    // Quartz has its own thread, so now put this script thread to sleep until
    // user hit CTRL+C
    while (!scheduler.isShutdown()) {
     Thread.sleep(Long.MAX_VALUE)
    }
    

And now you just need a config file `quartz-mysql.properties` that looks like this:

    
    # Main Quartz configuration
    org.quartz.scheduler.skipUpdateCheck = true
    org.quartz.scheduler.instanceName = DatabaseScheduler
    org.quartz.scheduler.instanceId = NON_CLUSTERED
    org.quartz.scheduler.jobFactory.class = org.quartz.simpl.SimpleJobFactory
    org.quartz.jobStore.class = org.quartz.impl.jdbcjobstore.JobStoreTX
    org.quartz.jobStore.driverDelegateClass = org.quartz.impl.jdbcjobstore.StdJDBCDelegate
    org.quartz.jobStore.dataSource = quartzDataSource
    org.quartz.jobStore.tablePrefix = QRTZ_
    org.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool
    org.quartz.threadPool.threadCount = 5
    
    # JobStore: JDBC jobStoreTX
    org.quartz.dataSource.quartzDataSource.driver = com.mysql.jdbc.Driver
    org.quartz.dataSource.quartzDataSource.URL = jdbc:mysql://localhost:3306/quartz2
    org.quartz.dataSource.quartzDataSource.user = quartz2
    org.quartz.dataSource.quartzDataSource.password = quartz2123
    org.quartz.dataSource.quartzDataSource.maxConnections = 8
    

You can run the Groovy script as usual

    
    bash> groovy quartzServer.groovy quartz-mysql.properties
    Dec 15, 2012 6:20:26 PM com.mchange.v2.log.MLog 
    INFO: MLog clients using java 1.4+ standard logging.
    Dec 15, 2012 6:20:27 PM com.mchange.v2.c3p0.C3P0Registry banner
    INFO: Initializing c3p0-0.9.1.1 [built 15-March-2007 01:32:31; debug? true; trace:10]
    [main] INFO org.quartz.impl.StdSchedulerFactory - Using default implementation for ThreadExecutor
    [main] INFO org.quartz.core.SchedulerSignalerImpl - Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl
    [main] INFO org.quartz.core.QuartzScheduler - Quartz Scheduler v.2.1.6 created.
    [main] INFO org.quartz.core.QuartzScheduler - JobFactory set to: org.quartz.simpl.SimpleJobFactory@1a40247
    [main] INFO org.quartz.impl.jdbcjobstore.JobStoreTX - Using thread monitor-based data access locking (synchronization).
    [main] INFO org.quartz.impl.jdbcjobstore.JobStoreTX - JobStoreTX initialized.
    [main] INFO org.quartz.core.QuartzScheduler - Scheduler meta-data: Quartz Scheduler (v2.1.6) 'DatabaseScheduler' with instanceId 'NON_CLUSTERED'
      Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
      NOT STARTED.
      Currently in standby mode.
      Number of jobs executed: 0
      Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 5 threads.
      Using job-store 'org.quartz.impl.jdbcjobstore.JobStoreTX' - which supports persistence. and is not clustered.
    
    [main] INFO org.quartz.impl.StdSchedulerFactory - Quartz scheduler 'DatabaseScheduler' initialized from the specified file : 'quartz-mysql.properties' from the class resource path.
    [main] INFO org.quartz.impl.StdSchedulerFactory - Quartz scheduler version: 2.1.6
    Dec 15, 2012 6:20:27 PM com.mchange.v2.c3p0.impl.AbstractPoolBackedDataSource getPoolManager
    INFO: Initializing c3p0 pool... com.mchange.v2.c3p0.ComboPooledDataSource [ acquireIncrement -> 3, acquireRetryAttempts
    -> 30, acquireRetryDelay -> 1000, autoCommitOnClose -> false, automaticTestTable -> null, breakAfterAcquireFailure -> false, checkoutTimeout -> 0, connectionCustomizerClassName -> null, connectionTesterClassName -> com.mchange.v2.c3p0.impl.DefaultConnectionTester, dataSourceName -> 1hge16k8r18mveoq1iqtotg|1486306, debugUnreturnedConnectionStackTraces -> fals
    e, description -> null, driverClass -> com.mysql.jdbc.Driver, factoryClassLocation -> null, forceIgnoreUnresolvedTransactions -> false, identityToken -> 1hge16k8r18mveoq1iqtotg|1486306, idleConnectionTestPeriod -> 0, initialPoolSize -> 3, jdbcUrl -> jdbc:mysql://localhost:3306/quartz2, lastAcquisitionFailureDefaultUser -> null, maxAdministrativeTaskTime -> 0
    , maxConnectionAge -> 0, maxIdleTime -> 0, maxIdleTimeExcessConnections -> 0, maxPoolSize -> 8, maxStatements -> 0, maxStatementsPerConnection -> 120, minPoolSize -> 1, numHelperThreads -> 3, numThreadsAwaitingCheckoutDefaultUser -> 0, pref
    erredTestQuery -> null, properties -> {user=******, password=******}, propertyCycle -> 0, testConnectionOnCheckin -> false, testConnectionOnCheckout -> false, unreturnedConnectionTimeout -> 0, usesTraditionalReflectiveProxies -> false ]
    [main] INFO org.quartz.impl.jdbcjobstore.JobStoreTX - Freed 0 triggers from 'acquired' / 'blocked' state.[main] INFO org.quartz.impl.jdbcjobstore.JobStoreTX - Recovering 0 jobs that were in-progress at the time of the last shut-down.
    [main] INFO org.quartz.impl.jdbcjobstore.JobStoreTX - Recovery complete.
    [main] INFO org.quartz.impl.jdbcjobstore.JobStoreTX - Removed 0 'complete' triggers.
    [main] INFO org.quartz.impl.jdbcjobstore.JobStoreTX - Removed 0 stale fired job entries.
    [main] INFO org.quartz.core.QuartzScheduler - Scheduler DatabaseScheduler_$_NON_CLUSTERED started.
    
    
    ... CTRL+C
    [Thread-6] INFO org.quartz.core.QuartzScheduler - Scheduler DatabaseScheduler_$_NON_CLUSTERED shutting down.
    [Thread-6] INFO org.quartz.core.QuartzScheduler - Scheduler DatabaseScheduler_$_NON_CLUSTERED paused.
    [Thread-6] INFO org.quartz.core.QuartzScheduler - Scheduler DatabaseScheduler_$_NON_CLUSTERED shutdown complete.
    

That's a full run of above setup. Go ahead and play with different config. Read [http://quartz-scheduler.org/documentation/quartz-2.1.x/configuration](http://quartz-scheduler.org/documentation/quartz-2.1.x/configuration/) for more details.

---

Here I will post couple more easy config that will get you started in a commonly used config set.

A MySQL cluster enabled configuration. With this, you can start one or more shell terminal and run different instance of `quartzServer.groovy` with the same config. All the quartz scheduler instances should cluster themselve and distribute your jobs evenly.

    
    # Main Quartz configuration
    org.quartz.scheduler.skipUpdateCheck = true
    org.quartz.scheduler.instanceName = DatabaseClusteredScheduler
    org.quartz.scheduler.instanceId = AUTO
    org.quartz.scheduler.jobFactory.class = org.quartz.simpl.SimpleJobFactory
    org.quartz.jobStore.class = org.quartz.impl.jdbcjobstore.JobStoreTX
    org.quartz.jobStore.driverDelegateClass = org.quartz.impl.jdbcjobstore.StdJDBCDelegate
    org.quartz.jobStore.dataSource = quartzDataSource
    org.quartz.jobStore.tablePrefix = QRTZ_
    org.quartz.jobStore.isClustered = true
    org.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool
    org.quartz.threadPool.threadCount = 5
    
    # JobStore: JDBC jobStoreTX
    org.quartz.dataSource.quartzDataSource.driver = com.mysql.jdbc.Driver
    org.quartz.dataSource.quartzDataSource.URL = jdbc:mysql://localhost:3306/quartz2
    org.quartz.dataSource.quartzDataSource.user = quartz2
    org.quartz.dataSource.quartzDataSource.password = quartz2123
    org.quartz.dataSource.quartzDataSource.maxConnections = 8
    

Here is another config set for a simple in-memory scheduler.

    
    # Main Quartz configuration
    org.quartz.scheduler.skipUpdateCheck = true
    org.quartz.scheduler.instanceName = InMemoryScheduler
    org.quartz.scheduler.jobFactory.class = org.quartz.simpl.SimpleJobFactory
    org.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool
    org.quartz.threadPool.threadCount = 5
    

Now, if you need more fancy UI management of Quartz, give [MySchedule](http://code.google.com/p/myschedule) a try.

Happy scheduling!