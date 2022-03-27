Title: NetBeans projects dependencies
Date: 2015-05-13 00:00:00-05:00
Tags: netbeans


With all the coolness of NetBeans, one of the feature I feel it's lacking is managing project denpendencies natively in IDE. Currently the only way to get this feature is if your Java projects are Maven based. If you have Ant based projects, then you would have to manually do this with hacks, and for each projects/sub-projects! Take a look at these two links:

[http://stackoverflow.com/questions/13669237/netbeans-java-how-to-add-as-library-another-project-with-dependencies](http://stackoverflow.com/questions/13669237/netbeans-java-how-to-add-as-library-another-project-with-dependencies)

[https://netbeans.org/bugzilla/show_bug.cgi?id=47507](https://netbeans.org/bugzilla/show_bug.cgi?id=47507)

With today's EE projects, you likely going to have many sub projects, and manually handling their dependencies on each project within the IDE is not fun, and hard to maintain. Basically the time you used to setup third party libraries on a ProjectA is wasted and will not automatically exported to ProjectB if it depends on it within the IDE. NetBeans seems to only use project dependencies as way to link related projects together, and to export the main proejct jar/classes, not its third party libraries. A transitive dependencies management feature is needed. Some of user's responses on this topic seem to simply suggest one should go with Maven. Well, as much as I like to use Maven myself, I don't think it acceptable to tell users to convert their existing projects from Ant to Maven just to use an IDE. The IDE tool should be more transparent in this regard.

It's worth to note that both Eclipse and Intellij have this feature and it's productive. I wish NetBeans can improve on this and provide a solution in near future.

