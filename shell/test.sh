set -e

cc-test-reporter before-build
yarn nyc mocha
cc-test-reporter after-build
