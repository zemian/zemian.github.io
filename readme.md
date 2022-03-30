## Helps

This project is a static site generator using Cecil.
https://cecil.app/

## Getting started

Run the server:

	./cecil.sh serve

Create a new article:

	./cecil.sh new:page blog/my-first-post.md

Build site:

	./cecil.sh build --output=docs

## It will not work behind a proxy server?

```
zemian-mac:zemian.github.io zemian$ ./cecil.sh -v serve
Building website...
Path: /Users/zemian/my-php/zemian.github.io
Config: /Users/zemian/my-php/zemian.github.io/config.yml
Cache: /Users/zemian/my-php/zemian.github.io/.cache
1. Loading content
2. Creating pages
3. Converting pages
^C
zemian-mac:zemian.github.io zemian$ ./cecil.sh -v serve
Building website...
Path: /Users/zemian/my-php/zemian.github.io
Config: /Users/zemian/my-php/zemian.github.io/config.yml
Cache: /Users/zemian/my-php/zemian.github.io/.cache
1. Loading content
2. Creating pages
3. Converting pages
4. Creating taxonomies
5. Generating pages
6. Creating menus
7. Copying static
8. Rendering pages
9. Saving pages
Built in 0.92s
Done! 🎉
Starting server (localhost:8000)...
```
