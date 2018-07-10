set -e

export TF_VAR_BUILD=master
cc-test-reporter before-build
yarn gulp build
yarn jest
cc-test-reporter after-build
bash shell/build.sh
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
