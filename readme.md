This repository contains code that generate https://zemian.github.io/ site

This project is a Static Site Generator powered by [jbake](https://jbake.org/)

### How to write a new post

```
cd zemian.github.io-site
# Add new file into `content/blog`

bin/jbake.sh -b -s ./ site
```

Preview it on http://localhost:8820

### The `site` folder

When we generate the site, the output is store in `site` folder. This repository
is a GitHub page repository and is directly served by https://zemian.github.io/ URL.
We have this readme perform a redirect to `site/index.html`

Note that the `site` folder is versioned!
