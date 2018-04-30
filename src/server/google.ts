/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/google.ts::module>>
 * BESPOKE<<getOAuthClient, getLoginURL, genAccessToken, genAccessTokenInfo>>
 * SIGNED<<emw8wED+gw2Dyn+JUpCS7DTl4v9tWEdLZ7KB20T0YDtfB1Lyfew3dnAAosqDPP8Aq+87B+ZVYkfULuqReM9t8w==>>
 */

import {
  OAuth2Client,
} from "google-auth-library";
import {
  google,
} from "googleapis";

export interface IAccessToken {
  tokens: { access_token?: string | null };
}

export interface IAccessTokenInfo {
  data: { email: string; user_id: string; verified_email: boolean };
}

function getOAuthClient(
): OAuth2Client {
  /* BESPOKE START <<getOAuthClient>> */
  return new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
  );
  /* BESPOKE END <<getOAuthClient>> */
}

export function getLoginURL(
): string {
  /* BESPOKE START <<getLoginURL>> */
  return getOAuthClient()
    .generateAuthUrl({
      scope: ["profile", "email"],
    });
  /* BESPOKE END <<getLoginURL>> */
}

export async function genAccessToken(
  code: string,
): Promise<string> {
  /* BESPOKE START <<genAccessToken>> */
  const accessToken: IAccessToken = await getOAuthClient()
    .getToken(code);

  return accessToken.tokens.access_token as string;
  /* BESPOKE END <<genAccessToken>> */
}

export async function genAccessTokenInfo(
  accessToken: string,
): Promise<IAccessTokenInfo> {
  /* BESPOKE START <<genAccessTokenInfo>> */
  return google
    .oauth2("v2")
    .tokeninfo({access_token: accessToken});
  /* BESPOKE END <<genAccessTokenInfo>> */
}
