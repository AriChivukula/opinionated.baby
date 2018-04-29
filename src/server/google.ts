/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/google.ts::module>>
 * BESPOKE<<DEPRECATE, getOAuthClient, getLoginURL, genAccessToken, genAccessTokenInfo>>
 * SIGNED<<k/g80BS37rsBsqyooapUURdMYUr6kMG9rP0zPiQIdPq8EYerHrjvpwLRgfT+4S4Kd5cbHBrcK/r+dow4g1gcSQ==>>
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
/* BESPOKE END <<DEPRECATE>> */

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
