#!/usr/bin/env bash

git checkout head
npm version $1
git push --tags

git checkout -
npm version $1 --no-git-tag-version
git push
