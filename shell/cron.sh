set -e

#!/bin/bash
for TF_VAR_BUILD in {1..1000}
do
  terraform init -backend-config="bucket=${TF_VAR_NAME}" -backend-config="key=tfstate/${TF_VAR_BUILD}.tfstate" infra/trigger
  terraform apply -auto-approve infra/pr
done
