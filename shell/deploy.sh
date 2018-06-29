set -e

bash shell/verify.sh
export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
rm -rf *.tfstate *.terraform *.init *.backup
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
