#!/usr/bin/env bash

PUBLISH_VERSION=`git rev-parse HEAD`
echo "Building prod site: $PUBLISH_VERSION"
rm -rf output_prod
./vendor/bin/sculpin generate --env=prod
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi

REPO=temp/zemian.github.io.git_gh-pages
if [[ ! -d $REPO ]]; then
    echo "Clone a temp git repo for publishing"
    git clone -b empty-branch git@github.com:zemian/zemian.github.io.git $REPO
fi

echo "Rebuild gh-pages branch and push to GitHub for publish"
pushd $REPO
git checkout --orphan gh-pages

# Copy the prod output dir
cp -rf ../../output_prod/* .
# Remove extra generated folder
rm -rf assets
# Create release/version file
echo $PUBLISH_VERSION > version.txt

git add .
git commit -m 'Publish'
git push -f origin gh-pages
git checkout empty-branch
git branch -D gh-pages
rm -rf *
popd

echo "Publish is complete: release=$PUBLISH_VERSION"
