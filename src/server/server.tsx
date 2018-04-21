import { Request, Response } from "express";
import graphqlHTTP from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema, GraphQLSchema } from "graphql";
import { join } from "path";
import { getRepository } from "typeorm";

import { dbConnection } from "./db";
import { User } from "./entity/User";
import {
  genAccessToken,
  genAccessTokenInfo,
  getLoginURL,
  IAccessToken,
  IAccessTokenInfo,
} from "./google";
import { prep } from "./util";

prep(dbConnection());

const schema: GraphQLSchema = buildSchema(
  readFileSync(join(__dirname, "schema.graphql"), "ascii"),
);

const root: (request: Request, response: Response) => Promise<object> =
  async (request: Request, response: Response): Promise<object> => ({
    login: async ({ input }: { input: { code: string } }): Promise<object> => {
      const token: IAccessToken = await genAccessToken(input.code);
      const accessToken: string = token.tokens.access_token as string;
      const info: IAccessTokenInfo = await genAccessTokenInfo(accessToken);
      let loggedin: User | undefined = await getRepository(User)
        .findOne(info.data.user_id);
      if (loggedin === undefined) {
        loggedin = new User();
        loggedin.id = info.data.user_id;
        loggedin.email = info.data.email;
        await getRepository(User)
          .save(loggedin);
      }

      return { accessToken };
    },
    loginURL: async (): Promise<string> => getLoginURL(),
    logout: async (): Promise<object> => ({
      accessToken: "",
    }),
    me: async ({ accessToken }: { accessToken: string | null }): Promise<object | null> => {
      if (accessToken === null) {
        return null;
      }
      try {
        const info: IAccessTokenInfo = await genAccessTokenInfo(accessToken);
        const loggedin: User | undefined = await getRepository(User)
          .findOne(info.data.user_id);
        if (loggedin === undefined) {
          return null;
        }

        return loggedin;
      } catch (error) {
        console.log(error);

        return null;
      }
    },
  });

export const server: graphqlHTTP.Middleware = graphqlHTTP(
  async (request: Request, response: Response): Promise<graphqlHTTP.OptionsData> => ({
    graphiql: true,
    rootValue: await root(request, response),
    schema,
  }),
);
