set -e

export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
rm -rf src/website/__tests__/__snapshots__
yarn ts-node node_modules/.bin/typescriptase --files gen/**/*.ts
yarn relay-compiler --src src/ --schema src/server/schema.graphql --language typescript
yarn gulp build
yarn jest -u build/2/website
cp -R build/2/website/__tests__/__snapshots__ src/website/__tests__/__snapshots__
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/trigger.tfstate" infra/trigger
terraform apply -auto-approve infra/trigger
git remote add target "https://arichiv:${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
git add -A
git commit -m "ACTUALIZE ${TF_VAR_BUILD}"
git push target HEAD:$TRAVIS_BRANCH
