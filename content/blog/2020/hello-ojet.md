Title: Hello Oracle JET
Date: 2020-03-25 00:00:00-05:00
Tags: ojet



Here are some short instructions on how to create your first Oracle JET (v8.1.0) application.

1. First you need to install NodeJS and then you should have npm command available in a Terminal.
2. Install OJET command line tool globally into NPM. Afterward, you will have the ojet command available in a Terminal.

```bash
npm install -g @oracle/ojet-cli
ojet --version
```

3. Generate an OJET application.

```bash
ojet create hello-ojet --template=basic
```

4. Now start the web server that comes with your project.

```bash
cd hello-app
ojet serve
open http://localhost:8000
```

Now you should see a blank application ready for you to start your next project!

![ojet-starter.png](/images/posts/2020/ojet-starter.png)

The project source that was generated in this article is available at [GitHub](https://github.com/zemian/hello-ojet/tree/demo-basic-template).

