set -e

git remote add target "https://arichiv:${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
git add -A
git commit -m "ACTUALIZE ${TRAVIS_BUILD_NUMBER}"
git push target HEAD:$TRAVIS_BRANCH
