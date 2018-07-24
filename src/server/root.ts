/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::root>>
 * BESPOKE<<custom>>
 * SIGNED<<J9FCy5Eb9w0afcgAaRFGr3gxQY8sbFhMkYnvR4PLOLGutLf1jQN3nT49Pgi/UgT8KqpaBJanNZoyEo3inVMTZQ==>>
 */

/* BESPOKE START <<custom>> */
import * as express from "express";
import { DB } from "foia-db";

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
    me: async (): Promise<object | null> => genNullOnThrow(
      // @ts-ignore
      async (): Promise<object | null> => await genUserForAccessToken(req.token),
    ),
    tools: async (): Promise<object[]> => genNullOnThrow(
      async (): Promise<object[]> => Object.entries(DB.tools).map(({ key: string, value: object }): object => { 
        entries[1].id = entries[0];
        return value;
      }),
    ),
    releases: async (): Promise<object[]> => genNullOnThrow(
      async (): Promise<object[]> => Object.entries(DB.releases).map(({ key: number, value: object }): object => { 
        value.id = key;
        return value;
      }),
    ),
  };
}
/* BESPOKE END <<custom>> */
