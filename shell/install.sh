set -e

export PATH=$HOME/.local/bin:$PATH
pip install --user awscli
wget https://releases.hashicorp.com/terraform/0.11.13/terraform_0.11.13_linux_amd64.zip
unzip terraform_0.11.13_linux_amd64.zip -d $HOME/.local/bin
rm terraform_0.11.13_linux_amd64.zip
npm install --global --upgrade yarn
yarn
