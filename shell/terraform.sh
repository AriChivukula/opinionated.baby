set -e

wget https://releases.hashicorp.com/terraform/0.11.7/terraform_0.11.7_linux_amd64.zip
unzip terraform_0.11.7_linux_amd64.zip
sudo mv terraform /usr/local/bin/
rm terraform_0.11.7_linux_amd64.zip
cd infra
terraform init
terraform apply -auto-approve
