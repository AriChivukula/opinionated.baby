import { Request, Response } from 'express';
import * as graphqlHTTP from 'express-graphql';
import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';
import * as invariant from 'invariant';
import { join } from 'path';
import { getManager } from "typeorm";

import { genAccessToken, genAccessTokenInfo, getLoginURL } from './google';
import { User } from './entity/user';

const entityManager = getManager();

const schema = buildSchema(
  readFileSync(join(__dirname, 'schema.graphql'), 'ascii')
);

type AccessToken = {
  accessToken: string
}

const root = async (request: Request, response: Response): Promise<any> => ({
  me: async ({ access_token }: { access_token: string }): Promise<User|undefined> => {
    try {
      const info = await genAccessTokenInfo(access_token);
      return await entityManager.findOneById(User, info.data.user_id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  loginURL: async (): Promise<string> => getLoginURL(),
  login: async (code: string): Promise<AccessToken> => {
    const token = await genAccessToken(code);
    const access_token = token.tokens.access_token || '';
    const info = await genAccessTokenInfo(access_token);
    let user = await entityManager.findOneById(User, info.data.user_id);
    if (!user) {
      user = new User();
      user.googleID = info.data.user_id;
      user.email = info.data.email;
      await entityManager.save(user);
    }
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

export default graphqlHTTP(async (request, response): Promise<any> => ({
  schema: schema,
  rootValue: await root(request, response),
  graphiql: true
}));
