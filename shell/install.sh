set -e

export PATH=$HOME/.local/bin:$PATH
pip install --user awscli
wget https://releases.hashicorp.com/terraform/0.12.0-rc1/terraform_0.12.0-rc1_linux_amd64.zip
unzip terraform_0.12.0-rc1_linux_amd64.zip -d $HOME/.local/bin
rm terraform_0.12.0-rc1_linux_amd64.zip
npm install --global --upgrade yarn
yarn
