export TF_VAR_BRANCH=$TRAVIS_BRANCH
yarn ts-node node_modules/.bin/typescriptase --files gen/*.ts
git remote add target "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
git add -A
git commit -m "ACTUALIZE ${TF_VAR_BRANCH}"
git push target HEAD:$TRAVIS_BRANCH
