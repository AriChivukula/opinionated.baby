set -e

cc-test-reporter before-build
yarn nyc mocha src/test
cc-test-reporter after-build
