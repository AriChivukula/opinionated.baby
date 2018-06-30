set -e

yarn outdated
yarn gulp build
yarn install --production=true --ignore-engines
cp build/3/server/index.js index.js
cp build/3/server/schema.graphql schema.graphql
zip -q -r dynamic.zip node_modules index.js schema.graphql
cp -R build/3/website static
rm -rf index.js schema.graphql
export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/${TF_VAR_BUILD}.tfstate" infra/pull_request
terraform apply -auto-approve infra/pull_request
curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST -d "{\"body\": \"[Test ${TF_VAR_BUILD}](https://static-${TF_VAR_BUILD}.${TF_VAR_DOMAIN})\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
