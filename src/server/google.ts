/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/google.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<34EvTO3H8QF7I2ZlYcLf8PiU63BE7+f+m9/hDXmYf1XxgATEBLrKXhxuGaoddPJovc/yZ62qZ45yo+gmy1EMsA==>>
 */

import {
  OAuth2Client,
} from "google-auth-library";
import {
  google,
} from "googleapis";


/* BESPOKE START <<DEPRECATE>> */
interface IAccessToken {
  tokens: {
    access_token?: string | null;
  };
}

export interface IAccessTokenInfo {
  data: {
    email: string;
    user_id: string;
    verified_email: boolean;
  };
}

function getOAuthClient(): OAuth2Client {
  return new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );
}

export function getLoginURL(): string {
  return getOAuthClient()
    .generateAuthUrl({
      scope: ["profile", "email"],
    });
}

export async function genAccessToken(code: string): Promise<string> {
  const accessToken: IAccessToken = await getOAuthClient()
    .getToken(code);

  return accessToken.tokens.access_token as string;
}

export async function genAccessTokenInfo(accessToken: string): Promise<IAccessTokenInfo> {
  return google
    .oauth2("v2")
    .tokeninfo({access_token: accessToken});
}
/* BESPOKE END <<DEPRECATE>> */
