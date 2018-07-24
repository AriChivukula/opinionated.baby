set -e

export TF_VAR_BRANCH=$TRAVIS_BRANCH
yarn outdated
yarn foia-db
bash shell/test.sh
