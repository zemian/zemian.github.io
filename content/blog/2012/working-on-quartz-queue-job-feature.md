Title: Working on Quartz Queue Job Feature
Date: 2012-02-17 00:00:00-05:00
Tags: quartz


My job at Bank of New York Mellon has been keeping me fairly busy lately. It's hard to juggle with Church, a family, a full time job, and time for open source projects. But it seems God has blessed me with not many skills nor hobbies other than programming, which I enjoy the most. So I tend to endup writing more code on weekend when the kids are asleep!

I haven't able to put much time into [MySchedule](http://code.google.com/p/myschedule)other than fixed couple of urgent issues recently. If you are using this app, you should get the latest download now.

However, I did spent time helping out on [Quartz](http://quartz-scheduler.org/)development on their next major feature: [Queue Jobs](http://svn.terracotta.org/fisheye/browse/Quartz/branches/quartz-2.2-prototype). I got most of the initial ground work done. I need to think more about how the concurrent issues with database row locking etc. This feature would allow you to add jobs into a queue structure that the quartz system will process without a trigger (meaning they are process immediatly.) These queue jobs would have a priority value that sorted by the queue as they are processed. We hope this feature would give some users to use the Quartz system to process jobs more effectively.

More of these to come in the future, so stay tuned.

