/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::Root>>
 * BESPOKE<<genRoot>>
 * SIGNED<<yF/EPJSI/BOS/l72eD4xkDh7mcwe8BbByWXLs5VMsJ1/JyRD1+kQOdhnzZKn5O540XH4rIgk5aFs6OEywrkyqw==>>
 */

import * as express from "express";

import {
  genAccessToken,
  genUserForAccessToken,
  getLoginURL,
} from "./google";
import {
  genNullOnThrow,
} from "./util";

export async function genRoot(
  req: express.Request,
  res: express.Response,
): Promise<object> {
  /* BESPOKE START <<genRoot>> */
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
      async () => genUserForAccessToken(req.token),
    ),
  };
  /* BESPOKE END <<genRoot>> */
}
