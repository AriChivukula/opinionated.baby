/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::Server>>
 * BESPOKE<<servers>>
 * SIGNED<<t793RpMk6FtnvSaTcr+3R8567fAo8eBMb2ony7sKsJEd5ozmmrbxGArMftgPuAIYfJAK2zPUCoopPhhRAN2OYw==>>
 */

import express from "express";
import graphqlHTTP from "express-graphql";
import {
  readFileSync,
} from "fs";
import {
  buildSchema,
  GraphQLSchema,
} from "graphql";
import {
  join,
} from "path";

import {
  genRoot,
} from "./root";

/* BESPOKE START <<servers>> */
const schema: GraphQLSchema = buildSchema(
  readFileSync(join(__dirname, "schema.graphql"), "ascii"),
);

export const graphQL: graphqlHTTP.Middleware = graphqlHTTP(
  async (req: express.Request, res: express.Response): Promise<graphqlHTTP.OptionsData> => ({
    graphiql: true,
    rootValue: await genRoot(req, res),
    schema,
  }),
);
/* BESPOKE END <<servers>> */
