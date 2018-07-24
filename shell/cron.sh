set -e

export TF_VAR_BRANCH=$TRAVIS_BRANCH
export TF_VAR_LOCAL_DOMAIN=TEMP.$DOMAIN
bash shell/build.sh
while :
do
  export TFSTATE="$(aws s3 ls s3://${TF_VAR_NAME}/PR_*.tfstate --page-size 1 | awk '{print $4}')"
  echo "no" | terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="${TFSTATE}" infra/pr || true
  terraform destroy -auto-approve infra/pr || true
  aws s3 rm "s3://${TF_VAR_NAME}/${TFSTATE}"
done
