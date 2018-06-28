set -e

yarn gulp build
yarn jest --collectCoverage
