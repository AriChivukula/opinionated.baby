set -e

export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
yarn outdated
bash shell/build_for_test.sh
