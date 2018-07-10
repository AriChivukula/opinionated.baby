set -e

bash shell/build_for_prod.sh
(( LOOP_START = TRAVIS_BUILD_NUMBER - 100 ))
(( LOOP_END = TRAVIS_BUILD_NUMBER - 1 ))
for TF_VAR_BUILD in `seq $LOOP_START $LOOP_END`
do
  export TF_VAR_BUILD=$TF_VAR_BUILD
  echo "no" | terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/${TF_VAR_BUILD}.tfstate" infra/trigger || true
  terraform destroy -auto-approve infra/pr || true
done
