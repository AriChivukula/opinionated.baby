// @flow

import fs from 'fs';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import invariant from 'invariant';
import path from 'path';

import { getOAuthClient, getLoginURL, getAccessTokenInfo } from './google.js';
import { User } from './models/index.js';

const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'ascii')
);

type AccessToken = {
  accessToken: string
}

const root = async (request, response): Promise<Object> => ({
  me: async ({access_token}): Promise<?User> => {
    try {
      const info = await getAccessTokenInfo(access_token);
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
    const info = await getAccessTokenInfo(access_token);
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
