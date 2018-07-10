set -e

export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
cc-test-reporter before-build
yarn gulp build
yarn jest
cc-test-reporter after-build
