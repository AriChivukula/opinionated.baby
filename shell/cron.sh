set -e

export TF_VAR_BRANCH=$TRAVIS_BRANCH
export TF_VAR_LOCAL_DOMAIN=TEMP.$DOMAIN
bash shell/build.sh
export TFSTATES="$(aws s3 ls s3://${TF_VAR_NAME} --recursive | grep 'PR_' | awk '{print $4}')"
echo "${TFSTATES}"
for TFSTATE in $TFSTATES
do
  echo "${TFSTATE}"
  echo "no" | terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=${TFSTATE}" infra/pr || true
  terraform destroy -auto-approve infra/pr || true
  aws s3 rm "s3://${TF_VAR_NAME}/${TFSTATE}"
done
