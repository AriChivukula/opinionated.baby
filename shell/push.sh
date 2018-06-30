set -e

bash shell/build.sh
yarn jest --collectCoverage
