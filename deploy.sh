#!/usr/bin/env bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Github (+ Bower)
git add -f dist
git checkout head
git commit -m "Version $PACKAGE_VERSION for distribution"
git tag -a "v$PACKAGE_VERSION" -m "Add tag v$PACKAGE_VERSION"
git checkout master
git push origin --tags