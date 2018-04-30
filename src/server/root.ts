/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/root.ts::module>>
 * BESPOKE<<genRoot>>
 * SIGNED<<4y3zr4ricP7owaELETaTS/apYh9PphuX2udGOe6r88BpfBd8VT4l7iyOmlRuCfJnao7uD0Eba35Lne5IP95C3w==>>
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
