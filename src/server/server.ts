/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/server.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<sQA3RiC28JG8fT9nak7RiR2xu13mbXgfxnsTlVBV2BHisxj95I/Y7chAYFa9qvpoVwC0Xbdhdms+aZcxYxLEDg==>>
 */

import express from "express";
import graphqlHTTP from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema, GraphQLSchema } from "graphql";
import { join } from "path";

import { genRoot } from "./root";

/* BESPOKE START <<DEPRECATE>> */
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
/* BESPOKE END <<DEPRECATE>> */
