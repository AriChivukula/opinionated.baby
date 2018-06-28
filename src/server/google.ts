/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/google.ts::module>>
 * BESPOKE<<getOAuthClient, getLoginURL, genAccessToken, genAccessTokenInfo, genUserForAccessToken>>
 * SIGNED<<owC7ut9kTDdSLBFNr0BNY7W0pjEGNDelfhwHXoJz81qqwsz+CfhvZFqFnZ1rX1TLVfK2hguO6oFb+6dl3tdIng==>>
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
  data: { email?: string | undefined; user_id?: string | undefined; verified_email?: boolean | undefined };
}

function getOAuthClient(
): OAuth2Client {
  /* BESPOKE START <<getOAuthClient>> */
  return new OAuth2Client(
    process.env.TF_VAR_CLIENT_ID,
    process.env.TF_VAR_CLIENT_SECRET,
    "https://" + process.env.TF_VAR_DOMAIN,
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

export async function genUserForAccessToken(
  accessToken: string,
): Promise<any> {
  /* BESPOKE START <<genUserForAccessToken>> */
  /* BESPOKE END <<genUserForAccessToken>> */
}
