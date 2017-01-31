#!/usr/bin/env bash

git checkout head
git add -f dist/
npm version $1
git push --tags
git checkout -
npm version $1 --no-git-tag-version
