Title: A simple Groovy issue tracker using file system
Date: 2012-12-18 00:00:00-05:00
Tags: groovy


It will be a chaos not to track bugs and feature requests when you developing software. Having a simple issue tracker would make managing the project much more successful. Now I like simple stuff, and I think for small project, having this tracker right inside the source control (especially with DSVC like Mercurial/Git etc) repository is not only doable, but very convenient as well. You don't have to go crazy with all the fancy features, but just enough to track issues are fine. I would like to propose this layout for you.

Let's say you have a project that looks like this

    ```
    project
     +- src/main/java/Hello.java
     +- issues/issue-001.md
     +- pom.xml
    ```

All I need is a simple directory `issues` to get going. Now I have a place to track my issue! First issue `issue-000.md` should be what your project is about. For example:

```
    /id=issue-001
    /createdon=2012-12-16 18:07:08
    /type=bug
    /status=new
    /resolution=
    /from=Zemian
    /to=
    /found=
    /fixed=
    /subject=A simple Java Hello program

    # Updated on 2012-12-16 18:07:08

    We want to create a Maven based Hello world program. It should print "Hello World."
```

I choose `.md` as file extension for intending to write comments in Markdown format. Since it's a text file, you do what you want. To be more structured, I have added some headers metadata for issue tracking. Let's define some here. I would propose to use these and formatting:

```    
     /id=issue-<NUM>
     /createdon=<TIMESTAMP>
     /type=feature|bug|question
     /status=new|reviewing|working|onhold|testing|resolved
     /resolution=fixed|rejected|duplicated
     /from=<REPORTER_FROM_NAME>
     /to=<ASSIGNEE_TO_NAME>
     /found=<VERSION_FOUND>
     /fixed=<VERSION_FIXED>
```    

That should cover most of the bug and feature development issues. It's not cool to write software without a history of changes, including these issues created. So let's use a source control. I highly recommend you to use Mercurial `hg`. You can create and initialize a new repository like this.

```    
    bash> cd project
    bash> hg init
    bash> hg add
    bash> hg commit -m "My hello world project"
```    

Now your project is created and we have a place to track your issues. Now it's simple text file, so use your favorite text editor and edit away. However, creating new issue with those header tags is boring. It will be nice to have a script that manage it a little. I have a Groovy script `issue.groovy` (see at the end of this article) that let you run reports and create new issues. You can add this script into your `project/issues` directory and you can instantly creating new issue and querying reports! Here is an example output on my PC:

```    
    bash> cd project
    bash> groovy scripts/issue.groovy
    
    Searching for issues with /status!=resolved
    Issue: /id=issue-001 /status=new /subject=A simple Java Hello program
    1 issues found.
    
    bash> groovy scripts/issue.groovy --new /type=feature /subject='Add a unit test.'
    
    project/issues/issue-002.md created.
    /id=issue-002
    /createdon=2012-12-16 19:10:00
    /type=feature
    /status=new
    /resolution=
    /from=Zemian
    /to=
    /found=
    /fixed=
    /subject=Add a unit test.
    
    bash> groovy scripts/issue.groovy
    
    Searching for issues with /status!=resolved
    Issue: /id=issue-000 /status=new /subject=A simple Java Hello program
    Issue: /id=issue-002 /status=new /subject=Add a unit test.
    2 issues found.
    
    bash> groovy scripts/issue.groovy --details /id=002
    
    Searching for issues with /id=002
    Issue: /id=issue-002
      /createdon=2012-12-16 19:10:00 /found= /from=Zemian /resolution= /status=new /type=feature
      /subject=Add a unit test.
    1 issues found.
    
    bash> groovy scripts/issue.groovy --update /id=001 /status=resolved /resolution=fixed 'I fixed this thang.'
    Updating issue /id=issue-001
    Updating /status=resolved
    Updating /resolution=fixed
    
    Update issue-001 completed.
```    

The script give you some quick and consistent way to create/update/search issues. But they are just plain text files! You can just as well fire up your favorite text editor and change any any thing you want. Save and even commit it into your source repository. All will not lost. 

I hope this issue tracking script can get your next project started quickly. Let me know what you do you think!

Enjoy!

Zemian

And here is my `issue.groovy` script.

---

Oh, and of course I eat my own *dog food. Here are few issues that I started to track the `issue.grooy` itself.

- v1.0.0 (2012/12/19)

- [issue-001](https://bitbucket.org/saltnlight5/sandbox/src/tip/scripts/issue-001.md)

- v1.0.1 (2012/12/20)

- [issue-002](https://bitbucket.org/saltnlight5/sandbox/src/tip/scripts/issue-002.md)
- [issue-003](https://bitbucket.org/saltnlight5/sandbox/src/tip/scripts/issue-003.md)

