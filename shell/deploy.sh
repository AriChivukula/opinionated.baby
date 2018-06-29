set -e

yarn gulp build
yarn install --production=true --ignore-engines
cp build/3/server/index.js index.js
cp build/3/server/schema.graphql schema.graphql
zip -q -r dynamic.zip node_modules index.js schema.graphql
rm -rf index.js schema.graphql node_modules
cp -R build/3/website static
export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
