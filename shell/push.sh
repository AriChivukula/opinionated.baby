set -e

export TF_VAR_BRANCH=$TRAVIS_BRANCH
yarn foia-db
bash shell/test.sh
