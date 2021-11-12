#!/usr/bin/env bash

./vendor/bin/sculpin generate --watch --server
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi
