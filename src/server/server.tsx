import { Request, Response } from "express";
import * as graphqlHTTP from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema, GraphQLSchema } from "graphql";
import { join } from "path";
import { createConnection, EntityManager, getManager } from "typeorm";

import { Login } from "./entity/login";
import {
  genAccessToken,
  genAccessTokenInfo,
  getLoginURL,
  IAccessToken,
  IAccessTokenInfo,
} from "./google";

const entityManager: EntityManager = getManager();

const schema: GraphQLSchema = buildSchema(
  readFileSync(join(__dirname, "schema.graphql"), "ascii"),
);

const root: (request: Request, response: Response) => Promise<object> =
  async (request: Request, response: Response): Promise<object> => ({
    login: async (code: string): Promise<object> => {
      const token: IAccessToken = await genAccessToken(code);
      const accessToken: string = token.tokens.access_token as string;
      const info: IAccessTokenInfo = await genAccessTokenInfo(accessToken);
      let user: Login | undefined = await entityManager.findOneById(Login, info.data.user_id);
      if (user !== undefined) {
        user = new Login();
        user.id = info.data.user_id;
        user.email = info.data.email;
        await entityManager.save(user);
      }

      return { accessToken };
    },
    loginURL: async (): Promise<string> => getLoginURL(),
    logout: async (): Promise<object> => ({
      accessToken: "",
    }),
    me: async ({ accessToken }: { accessToken: string }): Promise<object | undefined> => {
      try {
        const info: IAccessTokenInfo = await genAccessTokenInfo(accessToken);

        return await entityManager.findOneById(Login, info.data.user_id);
      } catch (error) {
        console.log(error);

        return undefined;
      }
    },
  });

export const server: graphqlHTTP.Middleware = graphqlHTTP(
  async (request: Request, response: Response): Promise<graphqlHTTP.OptionsData> => {
    await createConnection({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      name: "default",
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT as string, 10),
      type: "postgres",
      username: process.env.DB_USERNAME,
    });

    return {
      graphiql: true,
      rootValue: await root(request, response),
      schema,
    };
  },
);
