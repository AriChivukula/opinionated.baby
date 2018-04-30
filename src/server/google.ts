/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/google.ts::module>>
 * BESPOKE<<getOAuthClient, getLoginURL, genAccessToken, genAccessTokenInfo>>
 * SIGNED<<b2tIBTIdShqLBBj8w7hjGg32saWaw2rNTWSLuSpvnO4iQv+sPZ70SlbTi0UsmNzsNZAi4chMITJziuRQdByTgw==>>
 */

import {
  OAuth2Client,
} from "google-auth-library";
import {
  google,
} from "googleapis";

interface IAccessToken {
  tokens: { access_token?: string | null };
}

interface IAccessTokenInfo {
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
