set -e

npx gulp build
npx jest --collectCoverage
