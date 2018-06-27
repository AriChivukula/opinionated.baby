set -e

rm -rf src/website/__tests__/__snapshots__
npx ts-node node_modules/.bin/typescriptase --files gen/**/*.ts
npx relay-compiler --src src/ --schema src/server/schema.graphql --language typescript
npx gulp build
npx jest -u build/2/website
cp -R build/2/website/__tests__/__snapshots__ src/website/__tests__/__snapshots__
npx ts-node ./node_modules/.bin/typeorm schema:sync
