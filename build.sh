#!/usr/bin/env bash

if [[ ! -d node_modules ]]; then
	npm install
	node_modules/.bin/encore dev
fi

./vendor/bin/sculpin generate
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi
