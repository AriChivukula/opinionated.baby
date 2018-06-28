set -e

bash shell/verify.sh
export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
terraform init infra/master -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate"
terraform apply -state=infra/master/terraform.tfstate -auto-approve infra/master
