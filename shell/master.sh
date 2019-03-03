set -e

export TF_VAR_BRANCH=master
export TF_VAR_LOCAL_DOMAIN=$TF_VAR_DOMAIN
bash shell/test.sh
bash shell/build.sh
echo "no" | terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/trigger.tfstate" infra/trigger
terraform apply -auto-approve infra/trigger
echo "no" | terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/pr
terraform apply -auto-approve infra/pr
