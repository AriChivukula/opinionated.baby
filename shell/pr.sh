set -e

export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
export TF_VAR_ID=$TRAVIS_BUILD_ID
bash shell/build.sh
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/${TF_VAR_BUILD}.tfstate" infra/pr
terraform apply -auto-approve infra/pr
curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST -d "{\"body\": \"[Test ${TF_VAR_BUILD}](https://static-${TF_VAR_BUILD}.${TF_VAR_DOMAIN})\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
