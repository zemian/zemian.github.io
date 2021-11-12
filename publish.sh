#!/usr/bin/env bash

./vendor/bin/sculpin generate --env=prod
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi

git checkout --orphan gh-pages
mkdir -p temp/working_dir
mv * temp/working_dir
mv temp/working_dir/output_prod/* .
git add .
git commit -m 'Publish'
git push -f origin gh-pages
git checkout master
git branch -D gh-pages
cp -rf temp/working_dir/* .

echo "Publish is complete"
