set -e

bash shell/build.sh
export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
