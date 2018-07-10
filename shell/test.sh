set -e

cc-test-reporter before-build
yarn nyc mocha
yarn nyc report
cc-test-reporter after-build
