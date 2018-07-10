set -e

export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
yarn outdated
yarn gulp build
yarn jest
bash <(curl -s https://codecov.io/bash) -Z
