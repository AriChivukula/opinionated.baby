/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::Server>>
 * BESPOKE<<servers>>
 * SIGNED<<NWx8/hBDbw82UkzrxJkRqb2wJbD57q0MrFMPLuDZSxSoXZfEXBHFeXHBVsJOWHU1hNy2DMRnxfbLwV0KG1w6NQ==>>
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
  neptuneInit,
} from "./neptune";
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
