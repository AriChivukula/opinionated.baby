set -e

npx gulp build
npm prune --production
cp build/3/server/index.js index.js
cp build/3/server/schema.graphql schema.graphql
zip -q -r dynamic.zip node_modules index.js schema.graphql
cp -R build/3/website static
rm -rf index.js schema.graphql
terraform init infra/pull_request
terraform apply -state=infra/pull_request/terraform.tfstate -var name=$NAME -var domain=$DOMAIN -var build=$TRAVIS_BUILD_NUMBER infra/pull_request
"curl -H \"Authorization: token ${GITHUB_TOKEN}\" -X POST -d \"{\\\"body\\\": \\\"[Test build ${TRAVIS_BUILD_NUMBER}](https://static-${TRAVIS_BUILD_NUMBER}.$DOMAIN)\\\"}\" \"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments\""
