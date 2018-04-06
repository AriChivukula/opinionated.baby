// @flow

import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import invariant from 'invariant';
import { User } from './models/index.js';
import path from 'path';

const schema = buildSchema(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'ascii'));

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

type Query = {
  me: ?User,
  loginURL: string,
}

const root = async (request, response): Promise<Object> => ({
  me: async (): Promise<?User> => {
    try {
      const info = await google
        .oauth2('v2')
        .tokeninfo({access_token: request.cookies.access_token});
      return await User.findOne(
        {where: {googleID: info.data.user_id, email: info.data.email}}
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  loginURL: async (): Promise<string> => getLoginURL(),
  login: async (code: string): Promise<Query> => {
    const oauth = getOAuthClient();
    const token = await oauth.getToken(code);
    const access_token = token.tokens.access_token;
    const info = await google
      .oauth2('v2')
      .tokeninfo({access_token: access_token});
    response.cookie('access_token', access_token);
    const result = await User.findOrCreate(
      {where: {googleID: info.data.user_id, email: info.data.email}}
    );
    return {
      me: result[0],
      loginURL: getLoginURL(),
    };
  },
  logout: async(): Promise<Query> => {
    response.cookie('access_token', '');
    return {
      me: null,
      loginURL: getLoginURL(),
    };
  }
});

export default graphqlHTTP(async (request, response): Promise<Object> => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  return {
    schema: schema,
    rootValue: await root(request, response),
    graphiql: true
  };
});
