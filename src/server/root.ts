/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::Root>>
 * BESPOKE<<genRoot>>
 * SIGNED<<FjRbvmHVDwuIOjVb3EiypcRrGzupLJYtI+4U0AZhV2SMZtHQCqhxE3R+V9tJ0e9t6QNPliz18bpIQ/CQgNzqxA==>>
 */

import * as express from "express";

import {
  genAccessToken,
  genUserForAccessToken,
  getLoginURL,
} from "./google";
import {
  createOrUpdateUser,
} from "./neptune";
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
