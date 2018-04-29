/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/root.ts::module>>
 * BESPOKE<<genRoot>>
 * SIGNED<<R2qfLeGvVt67yWioBGP9LKEwpCmosDmS1MiIkfsZEbCVoTkJ4H8bo+6P71QiCEHoZeRuQpVME/AslgcqWMyEUw==>>
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
    me: async (): Promise<object | null> => genNullOnThrow(async () => genUserForAccessToken(req.token)),
  };
  /* BESPOKE END <<genRoot>> */
}
