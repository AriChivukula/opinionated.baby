set -e

npx gulp build
"curl -H \"Authorization: token ${GITHUB_TOKEN}\" -X POST -d \"{\\\"body\\\": \\\"[Test build ${TRAVIS_BUILD_NUMBER}](https://static-${TRAVIS_BUILD_NUMBER}.$DOMAIN)\\\"}\" \"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments\""
