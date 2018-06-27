set -e

npx gulp build
npm prune --production
cp build/3/server/index.js index.js
cp build/3/server/schema.graphql schema.graphql
zip -q -r build/dist.zip node_modules index.js schema.graphql
rm -rf index.js schema.graphql
