#!/usr/bin/env bash

npm test
npm run build

git checkout head
npm version $1
git push --tags

git checkout -
npm version $1 --no-git-tag-version
git push
