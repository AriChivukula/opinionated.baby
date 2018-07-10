set -e

export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
yarn outdated
cc-test-reporter before-build
yarn gulp build
yarn jest
