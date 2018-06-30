set -e

yarn outdated
bash shell/build_and_install_site.sh
export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/${TF_VAR_BUILD}.tfstate" infra/pull_request
terraform apply -auto-approve infra/pull_request
curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST -d "{\"body\": \"[Test ${TF_VAR_BUILD}](https://static-${TF_VAR_BUILD}.${TF_VAR_DOMAIN})\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
