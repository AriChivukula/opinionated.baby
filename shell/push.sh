set -e

export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
yarn outdated
bash shell/test.sh
