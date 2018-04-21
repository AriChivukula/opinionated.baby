import { genUserForAccessToken } from "./db";
import {
  genAccessToken,
  getLoginURL,
} from "./google";
import { nullOnThrow } from "./util";

export const root: () => Promise<object> =
  async (): Promise<object> => ({
    login: async ({ input }: { input: { code: string } }): Promise<object> => {
      const accessToken: string = await genAccessToken(input.code);
      await genUserForAccessToken(accessToken);

      return { accessToken };
    },
    loginURL: async (): Promise<string> => getLoginURL(),
    logout: async (): Promise<object> => ({
      accessToken: "",
    }),
    me: async ({ accessToken }: { accessToken: string | null }): Promise<object | null> => {
      if (accessToken === null) {
        return null;
      }

      return nullOnThrow(genUserForAccessToken(accessToken));
    },
  });
