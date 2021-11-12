#!/usr/bin/env bash

./vendor/bin/sculpin generate --env=prod
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi

REPO=temp/zemian.github.io.git_gh-pages
if [[ ! -d $REPO ]]; then
    git clone -b gh-pages git@github.com:zemian/zemian.github.io.git $REPO
fi

pushd $REPO
rm -rf *
cp -rf ../../output_prod/* .
git add .
git commit -m 'Publish'
git push -f origin gh-pages
popd

echo "Publish is complete"
