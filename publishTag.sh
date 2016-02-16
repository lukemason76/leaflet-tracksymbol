#!/bin/sh

MESSAGE="Updated to version $1"
git add bower.json && git add package.json && git commit -m "$MESSAGE" && git push && git push github && git tag -s -m "$MESSAGE" v$1 && git push origin v$1 && git push github v$1 && npm publish
