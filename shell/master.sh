set -e

export TF_VAR_BUILD=master
bash shell/build_for_test.sh
bash shell/build_for_prod.sh
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
