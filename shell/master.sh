set -e

export TF_VAR_BUILD=master
bash shell/test.sh
bash shell/build.sh
terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/master.tfstate" infra/master
terraform apply -auto-approve infra/master
curl https://api.rollbar.com/api/1/deploy/ -F access_token=$TF_VAR_ROLLBAR_CLIENT -F environment=production -F revision=`git log -n 1 --pretty=format:"%H"` -F local_username=`whoami`
