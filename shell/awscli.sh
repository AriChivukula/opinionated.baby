set -e

export PATH=$HOME/.local/bin:$PATH
pip install --user awscli
mkdir build
aws s3 sync s3://builds.$BUCKET/$TRAVIS_BUILD_NUMBER . --exclude "*.git*" --exclude "*node_modules*"
aws s3 sync . s3://builds.$BUCKET/$TRAVIS_BUILD_NUMBER --exclude "*.git*" --exclude "*node_modules*"
