#!/usr/bin/env bash

if [[ ! -d node_modules ]]; then
	npm install
	node_modules/.bin/encore dev
fi


PUBLISH_VERSION=`git rev-parse HEAD`
echo "Building prod site: $PUBLISH_VERSION"

rm -rf docs
./vendor/bin/sculpin generate --env=prod --output-dir=docs
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi

# Create release/version file
echo $PUBLISH_VERSION > docs/version.txt

# Remove extra folders
# https://github.com/sculpin/sculpin/issues/467
echo "Removing extra assets folder"
rm -rf docs/assets

echo "Adding and committing new files to Git"
git add .
git commit -m 'Publish'
echo "Publishing content to GitHub"
git push

echo "Done"
echo "Site is published with version: $PUBLISH_VERSION"
