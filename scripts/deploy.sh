#!/usr/bin/env bash

npm test
npm run build

git checkout head
git add -f dist
npm version $1 -f
git push --tags

git checkout -
npm version $1 --no-git-tag-version
git push
