import { Request, Response } from "express";
import graphqlHTTP from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema, GraphQLSchema } from "graphql";
import { join } from "path";
import { createConnection, EntityManager, getManager } from "typeorm";

import { User } from "./entity/User";
import {
  genAccessToken,
  genAccessTokenInfo,
  getLoginURL,
  IAccessToken,
  IAccessTokenInfo,
} from "./google";

createConnection({
   database: process.env.DB_NAME,
   entities: [User],
   host: process.env.DB_HOST,
   password: process.env.DB_PASSWORD,
   port: parseInt(process.env.DB_PORT as string, 10),
   type: "postgres",
   username: process.env.DB_USERNAME,
})
  .catch((err: Error): void => { console.log(err); })
  .then((): void => { console.log("DB Connected"); })
  .catch((err: Error): void => { console.log(err); });

const schema: GraphQLSchema = buildSchema(
  readFileSync(join(__dirname, "schema.graphql"), "ascii"),
);

const root: (request: Request, response: Response) => Promise<object> =
  async (request: Request, response: Response): Promise<object> => ({
    login: async ({ input }: { input: { code: string } }): Promise<object> => {
      const entityManager: EntityManager = getManager();
      const token: IAccessToken = await genAccessToken(input.code);
      const accessToken: string = token.tokens.access_token as string;
      const info: IAccessTokenInfo = await genAccessTokenInfo(accessToken);
      let loggedin: User | undefined = await entityManager.findOneById(User, info.data.user_id);
      if (loggedin === undefined) {
        loggedin = new User();
        loggedin.id = info.data.user_id;
        loggedin.email = info.data.email;
        await entityManager.save(loggedin);
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
        const entityManager: EntityManager = getManager();
        const loggedin: User | undefined = await entityManager.findOneById(User, info.data.user_id);
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
