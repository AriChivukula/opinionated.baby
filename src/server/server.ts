import express from "express";
import graphqlHTTP from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema, GraphQLSchema } from "graphql";
import { join } from "path";

import { root } from "./root";

const schema: GraphQLSchema = buildSchema(
  readFileSync(join(__dirname, "schema.graphql"), "ascii"),
);

export const server: graphqlHTTP.Middleware = graphqlHTTP(
  async (req: express.Request, res: express.Response): Promise<graphqlHTTP.OptionsData> => ({
    graphiql: true,
    rootValue: await root(req, res),
    schema,
  }),
);
