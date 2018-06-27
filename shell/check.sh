set -e

npm outdated > .outdated.new || true
npm outdated || true
cmp -s .outdated.new .outdated
rm .outdated.new
