/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::server>>
 * BESPOKE<<custom>>
 * SIGNED<<J9FCy5Eb9w0afcgAaRFGr3gxQY8sbFhMkYnvR4PLOLGutLf1jQN3nT49Pgi/UgT8KqpaBJanNZoyEo3inVMTZQ==>>
 */

/* BESPOKE START <<custom>> */
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
/* BESPOKE END <<custom>> */
