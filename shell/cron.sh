set -e

export TF_VAR_BRANCH=$TRAVIS_BRANCH
export TF_VAR_LOCAL_DOMAIN=TEMP.$DOMAIN
bash shell/build.sh
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/PR_*.tfstate" infra/pr || true
terraform destroy -auto-approve infra/pr || true
