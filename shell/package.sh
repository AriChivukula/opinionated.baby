set -e

npm prune --production
cp build/3/server/index.js index.js && cp build/3/server/schema.graphql schema.graphql && cp -R build/3/website website
zip -q -r build/dist.zip node_modules index.js schema.graphql website
rm -rf index.js schema.graphql website
