set -e

npx gulp build
"curl -H \"Authorization: token ${GITHUB_TOKEN}\" -X POST -d \"{\\\"body\\\": \\\"[Test build ${TRAVIS_BUILD_NUMBER}](https://to.do)\\\"}\" \"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments\""
