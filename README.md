# Opinionated Baby

## Self-Hosting
* [Production](https://opinionated.baby/) (Current Release)
* [Beta](https://beta.opinionated.baby/) (Current Master)

## Getting Started
1. Download the [latest release](https://github.com/arichiv/opinionated.baby/releases)
2. Install [Node.js](https://nodejs.org/en/)
3. Setup your environment:
   1. [Google OAuth](https://developers.google.com/identity/protocols/OAuth2) (CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
   2. [PostgreSQL](https://www.postgresql.org/) (DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST)
   3. Localhost port (PORT)
4. Run `npm run prep && npm run sql && npm run build && npm run serve`
5. Navigate to [127.0.0.1:8080](http://127.0.0.1:8080)
6. Use `npm run launch` to try the electron version of the same app

## Next Steps
1. Deploy using:
   1. [Travis CI](https://travis-ci.org/)
   2. [S3](https://aws.amazon.com/s3/)
   3. [Lambda](https://aws.amazon.com/lambda/)
2. Poke around the code
4. Customize to your heart's content
5. ???
6. Profit!
