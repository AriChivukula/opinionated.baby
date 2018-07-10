set -e

cc-test-reporter before-build
yarn nyc mocha
yarn nyc report --reporter=lcov
cc-test-reporter after-build
