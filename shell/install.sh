set -e

export PATH=$HOME/.local/bin:$PATH
wget https://releases.hashicorp.com/terraform/0.11.7/terraform_0.11.7_linux_amd64.zip
unzip terraform_0.11.7_linux_amd64.zip -d $HOME/.local/bin
rm terraform_0.11.7_linux_amd64.zip
yarn
