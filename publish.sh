#!/usr/bin/env bash

./vendor/bin/sculpin generate --env=prod
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi

git checkout --orphan gh-pages
mv output_prod .output_prod
rm -rf *
mv .output_prod/* .
rm -rf .output_prod
rm .editorconfig
git add .
git commit -m 'Publish'
git push -f origin gh-pages
git checkout master
git branch -D gh-pages
