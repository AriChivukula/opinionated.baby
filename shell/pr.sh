set -e

export TF_VAR_BRANCH=$TRAVIS_PULL_REQUEST_BRANCH
export TF_VAR_LOCAL_DOMAIN=static-$TF_VAR_BRANCH.$TF_VAR_DOMAIN
bash shell/build.sh
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/PR_${TF_VAR_BRANCH}.tfstate" infra/pr
terraform apply -auto-approve infra/pr
curl -u "${GITHUB_USER}:${GITHUB_TOKEN}" -X POST -d "{\"body\": \"[Test ${TRAVIS_BUILD_NUMBER}](https://static-${TF_VAR_BRANCH}.${TF_VAR_DOMAIN})\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
