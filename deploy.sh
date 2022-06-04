#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory

(git show-branch gh-pages &>/dev/null) && (git checkout gh-pages) || (git checkout -b gh-pages)
git add dist -f
git commit -m 'deploy' --no-verify

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git subtree push --prefix dist origin gh-pages

git checkout main