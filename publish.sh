#!/usr/bin/env bash

pelican -s publishconf.py -d -o docs
git add .
git commit -m 'Publish site'
git push
