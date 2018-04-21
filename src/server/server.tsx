import graphqlHTTP from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema, GraphQLSchema } from "graphql";
import { join } from "path";

import { dbConnection } from "./db";
import { root } from "./root";
import { makeSync, nullOnThrow } from "./util";

makeSync(dbConnection());

const schema: GraphQLSchema = buildSchema(
  readFileSync(join(__dirname, "schema.graphql"), "ascii"),
);

export const server: graphqlHTTP.Middleware = graphqlHTTP(
  async (): Promise<graphqlHTTP.OptionsData> => ({
    graphiql: true,
    rootValue: await root(),
    schema,
  }),
);
