set -e

export TF_VAR_BUILD=master
export TF_VAR_ID=$TRAVIS_BUILD_ID
bash shell/build.sh
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
