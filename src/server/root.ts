/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/root.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<bO0xMycHoNNP78ArpCzminiuM47kJ3DQSBfhSNKq10188mjO6No0xp4T7Zykun1hbxq+hCI4U7l/XOVSH2n+kw==>>
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
