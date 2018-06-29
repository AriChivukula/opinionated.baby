set -e

bash shell/verify.sh
export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
terraform workspace new example
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
