/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/root.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<PF+hN3FTKBYKoMawD5Np41hAxAg/RomoboXqXx2eMACG64lnCn1bwkzRuwh9LwVho45jBxbNQgdvKjaCOihpCg==>>
 */

import express from "express";

import {
  genUserForAccessToken,
} from "./db";
import {
  genAccessToken,
  getLoginURL,
} from "./google";
import {
  genNullOnThrow,
} from "./util";

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
