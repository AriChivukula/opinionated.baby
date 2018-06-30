set -e

yarn gulp build
yarn install --production=true --ignore-engines
cp build/3/server/index.js index.js
cp build/3/server/schema.graphql schema.graphql
zip -q -r dynamic.zip node_modules index.js schema.graphql
cp -R build/3/website static
rm -rf index.js schema.graphql
