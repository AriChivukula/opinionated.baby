set -e

export TF_VAR_BRANCH=$TRAVIS_BRANCH
bash shell/build.sh
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/PR_*.tfstate" infra/trigger || true
terraform destroy -auto-approve infra/pr || true
