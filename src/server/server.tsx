import { Request, Response } from "express";
import graphqlHTTP from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema, GraphQLSchema } from "graphql";
import { join } from "path";

import { dbConnection, genUserForAccessToken } from "./db";
import {
  genAccessToken,
  getLoginURL,
} from "./google";
import { prep } from "./util";

prep(dbConnection());

const schema: GraphQLSchema = buildSchema(
  readFileSync(join(__dirname, "schema.graphql"), "ascii"),
);

const root: (request: Request, response: Response) => Promise<object> =
  async (request: Request, response: Response): Promise<object> => ({
    login: async ({ input }: { input: { code: string } }): Promise<object> => {
      const accessToken: string = await genAccessToken(input.code);
      await genUserForAccessToken(accessToken);

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
        return await genUserForAccessToken(accessToken);
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
