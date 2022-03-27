#!/usr/bin/env bash

pelican -s publishconf.py -o docs
git commit -m 'Publish site'
git push
