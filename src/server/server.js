// @flow

import fs from 'fs';
import graphqlHTTP from 'express-graphql';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { buildSchema } from 'graphql';
import invariant from 'invariant';
import path from 'path';

import { User } from './models/index.js';

const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'ascii')
);

function getOAuthClient(): OAuth2Client {
  return new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
}

function getLoginURL(): string {
  return getOAuthClient()
    .generateAuthUrl({
      scope: ['profile', 'email'],
    });
}

type AccessToken = {
  accessToken: string
}

const root = async (request, response): Promise<Object> => ({
  me: async ({access_token}): Promise<?User> => {
    try {
      const info = await google
        .oauth2('v2')
        .tokeninfo({access_token: access_token});
      return await User.findOne(
        {where: {googleID: info.data.user_id, email: info.data.email}}
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  loginURL: async (): Promise<string> => getLoginURL(),
  login: async (code: string): Promise<AccessToken> => {
    const oauth = getOAuthClient();
    const token = await oauth.getToken(code);
    const access_token = token.tokens.access_token;
    const info = await google
      .oauth2('v2')
      .tokeninfo({access_token: access_token});
    await User.findOrCreate(
      {where: {googleID: info.data.user_id, email: info.data.email}}
    );
    return {
      accessToken: access_token
    };
  },
  logout: async(): Promise<AccessToken> => {
    return {
      accessToken: ''
    };
  }
});

export default graphqlHTTP(async (request, response): Promise<Object> => ({
  schema: schema,
  rootValue: await root(request, response),
  graphiql: true
}));
