/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::root>>
 * BESPOKE<<custom>>
 * SIGNED<<J9FCy5Eb9w0afcgAaRFGr3gxQY8sbFhMkYnvR4PLOLGutLf1jQN3nT49Pgi/UgT8KqpaBJanNZoyEo3inVMTZQ==>>
 */

/* BESPOKE START <<custom>> */
import * as express from "express";
import { Graph, IVertex } from "foia-db";

import {
  genAccessToken,
  genUserForAccessToken,
  getLoginURL,
} from "./google";
import {
  genNullOnThrow,
} from "./utility";

export async function genRoot(
  req: express.Request,
  res: express.Response,
): Promise<object> {
  return {
    login: async ({ input }: { input: { code: string } }): Promise<object> => {
      const accessToken: string = await genAccessToken(input.code);
      await genUserForAccessToken(accessToken);

      return { accessToken };
    },
    loginURL: async (): Promise<string> => getLoginURL(),
    logout: async (): Promise<object> => ({
      accessToken: "",
    }),
    me: async (): Promise<object | null> => await genNullOnThrow(
      // @ts-ignore
      async (): Promise<object | null> => await genUserForAccessToken(req.token),
    ),
    tools: async (): Promise<object[]> => Graph.read().Vertices().outVertex("tool").listVertices().map((v: IVertex) => ({
      id: v.id,
      icon: v.properties["icon"].id,
      link: v.properties["link"].id,
      title: v.properties["title"].id,
    })),
    releases: async (): Promise<object[]> => Graph.read().Vertices().outVertex("release").listVertices().map((v: IVertex) => ({
      id: v.id,
      title: v.properties["title"].id,
      subtitle: v.properties["subtitle"].id,
    })),
  };
}
/* BESPOKE END <<custom>> */
