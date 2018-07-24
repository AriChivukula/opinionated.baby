export TF_VAR_BRANCH=$TRAVIS_BRANCH
yarn foia-db --compile
yarn ts-node node_modules/.bin/typescriptase --files gen/*.ts
yarn relay-compiler --src src/ --schema src/server/schema.graphql --language typescript
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/trigger.tfstate" infra/trigger
terraform apply -auto-approve infra/trigger
git remote add target "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
git add -A
git commit -m "ACTUALIZE ${TF_VAR_BRANCH}"
git push target HEAD:$TRAVIS_BRANCH
