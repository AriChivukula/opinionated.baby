/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/root.ts::module>>
 * BESPOKE<<genRoot>>
 * SIGNED<<Sf89ynE9jHElM9HY+IlpIYgB2o9/Xw3iEF6AKealciE1NjabcyCN0UQqNIY1H/wOEuqprVC8V2EfkKTIq3tvlQ==>>
 */

import express from "express";

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
    me: async (): Promise<object | null> => genNullOnThrow(async () => genUserForAccessToken(req.token)),
  };
  /* BESPOKE END <<genRoot>> */
}
