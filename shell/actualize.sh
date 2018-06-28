set -e

rm -rf src/website/__tests__/__snapshots__
yarn ts-node node_modules/.bin/typescriptase --files gen/**/*.ts
yarn relay-compiler --src src/ --schema src/server/schema.graphql --language typescript
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/global.tfstate" infra/global
terraform apply -state=infra/global/terraform.tfstate -auto-approve infra/global
git remote add target "https://arichiv:${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
git add -A
git commit -m "ACTUALIZE ${TRAVIS_BUILD_NUMBER}"
git push target HEAD:$TRAVIS_BRANCH
