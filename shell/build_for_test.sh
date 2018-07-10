set -e

cc-test-reporter before-build
yarn jest
cc-test-reporter after-build
