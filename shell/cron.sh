set -e

export TF_VAR_BUILD=$TRAVIS_BUILD_NUMBER
export TF_VAR_LOCAL_DOMAIN=$TF_VAR_DOMAIN
bash shell/build.sh
(( LOOP_START = TRAVIS_BUILD_NUMBER - 123 ))
(( LOOP_END = TRAVIS_BUILD_NUMBER - 12 ))
for TF_VAR_BUILD in `seq $LOOP_START $LOOP_END`
do
  export TF_VAR_BUILD=$TF_VAR_BUILD
  echo "no" | terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/${TF_VAR_BUILD}.tfstate" infra/trigger || true
  terraform destroy -auto-approve infra/pr || true
done
