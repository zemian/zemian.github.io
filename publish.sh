#!/usr/bin/env bash

echo "Building prod site"
./vendor/bin/sculpin generate --env=prod
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi

REPO=temp/zemian.github.io.git_gh-pages
if [[ ! -d $REPO ]]; then
    echo "Clone a temp git repo for publishing"
    git clone -b empty-branch git@github.com:zemian/zemian.github.io.git $REPO
    pushd $REPO
    git config user.email 'zemiandeng@gmail.com'
    popd
fi

echo "Rebuild gh-pages branch and push to GitHub for publish"
pushd $REPO
git checkout --orphan gh-branch
cp -rf ../../output_prod/* .
git add .
git commit -m 'Publish'
git push -f origin gh-pages
git checkout empty-branch
rm -rf *
popd

echo "Publish is complete"
