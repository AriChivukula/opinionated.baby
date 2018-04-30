/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/server.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<9oGbS1P6gc20fPwYTYGc9eVnZYEPWfDaujDR2ZWoGsuoSJYVnBKGDZSnZca605wzvFrTnzR9KE6dPXbx1N3Fcg==>>
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
