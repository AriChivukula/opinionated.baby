set -e

bash shell/build.sh
for TF_VAR_BUILD in {(TF_VAR_BUILD-1000)..(TF_VAR_BUILD-10)}
do
  export TF_VAR_BUILD=$TF_VAR_BUILD
  echo "no" | terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/${TF_VAR_BUILD}.tfstate" infra/trigger || true
  terraform destroy -auto-approve infra/pr || true
done
