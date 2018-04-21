import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

interface IAccessToken {
  tokens: {
    access_token?: string | null;
  };
}

export interface IAccessTokenInfo {
  data: {
    email: string;
    email_verified: boolean;
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

export const genAccessToken: (code: string) => Promise<string> =
  async (code: string): Promise<string> => {
    const accessToken: IAccessToken = await getOAuthClient()
      .getToken(code);

    return accessToken.tokens.access_token as string;
  };

export const genAccessTokenInfo: (accessToken: string) => Promise<IAccessTokenInfo> =
  async (accessToken: string): Promise<IAccessTokenInfo> => google
    .oauth2("v2")
    .tokeninfo({access_token: accessToken});
