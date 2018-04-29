/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/root.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<rNFni3I32652MatDBgAhx5ZRlih3suWbwP2+aOQ6kLTC/QhHAsdJKaggfC5WS8PqMAy0Ajul1U6rxBf5pdW//g==>>
 */

import express from "express";

import { genUserForAccessToken } from "./db";
import { genAccessToken, getLoginURL } from "./google";
import { genNullOnThrow } from "./util";

/* BESPOKE START <<DEPRECATE>> */
export async function genRoot(req: express.Request, res: express.Response): Promise<object> {
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
    me: async (): Promise<object | null> => genNullOnThrow(async () => genUserForAccessToken(req.token)),
  };
}
/* BESPOKE END <<DEPRECATE>> */
