set -e

cc-test-reporter before-build
yarn gulp build
yarn jest
cc-test-reporter after-build
