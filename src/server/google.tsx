import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

export interface IAccessToken {
  tokens: {
    access_token?: string | null | undefined;
  };
}

export interface IAccessTokenInfo {
  data: {
    email: string;
    user_id: string;
  };
}

const getOAuthClient: () => OAuth2Client =
  (): OAuth2Client => new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );

export const getLoginURL: () => string =
  (): string => getOAuthClient()
    .generateAuthUrl({
      scope: ["profile", "email"],
    });

export const genAccessToken: (code: string) => Promise<IAccessToken> =
  async (code: string): Promise<IAccessToken> => getOAuthClient()
    .getToken(code);

export const genAccessTokenInfo: (accessToken: string) => Promise<IAccessTokenInfo> =
  async (accessToken: string): Promise<IAccessTokenInfo> => google
    .oauth2("v2")
    .tokeninfo({access_token: accessToken});
