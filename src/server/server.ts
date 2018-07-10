/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/server.ts::module>>
 * BESPOKE<<servers>>
 * SIGNED<<7fRMp7i3q1DMSimft7hKNcwBCcvls9ODKw6EM6H0vAGGjSWaZMFclxbwUeGpG9E87hvADmgxl2+OK35da/BSKA==>>
 */

import * as express from "express";
import * as graphqlHTTP from "express-graphql";
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
