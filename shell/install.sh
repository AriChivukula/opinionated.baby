set -e

export PATH=$HOME/.local/bin:$PATH
cc-test-reporter before-build
wget https://releases.hashicorp.com/terraform/0.11.7/terraform_0.11.7_linux_amd64.zip
unzip terraform_0.11.7_linux_amd64.zip -d $HOME/.local/bin
rm terraform_0.11.7_linux_amd64.zip
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
chmod +x ./cc-test-reporter
mv cc-test-reporter $HOME/.local/bin/cc-test-reporter
npm install --global --upgrade yarn
yarn
