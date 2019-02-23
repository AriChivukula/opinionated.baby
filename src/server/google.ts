/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::google>>
 * BESPOKE<<custom>>
 * SIGNED<<J9FCy5Eb9w0afcgAaRFGr3gxQY8sbFhMkYnvR4PLOLGutLf1jQN3nT49Pgi/UgT8KqpaBJanNZoyEo3inVMTZQ==>>
 */

/* BESPOKE START <<custom>> */
import {
  OAuth2Client,
} from "google-auth-library";
import {
  google,
} from "googleapis";
import vault from "node-vault";

export interface IAccessToken {
  tokens: { access_token?: string | null };
}

export interface IAccessTokenInfo {
  data: { email?: string | undefined; user_id?: string | undefined; verified_email?: boolean | undefined };
}

function getVaultClient(
): vault.client {
  return vault({
    endpoint: "https://nomoresecrets.chivuku.la/",
    token: process.env.TF_VAR_VAULT_TOKEN,
  });
}

async function genOAuthClient(
): Promise<OAuth2Client> {
  const client = getVaultClient();
  const client_id = await client.read("opinionated.baby/TF_VAR_CLIENT_ID");
  const client_secret = await client.read("opinionated.baby/TF_VAR_CLIENT_SECRET");
  return new OAuth2Client(
    client_id,
    client_secret,
    "https://" + process.env.TF_VAR_DOMAIN,
  );
}

export async function genLoginURL(
): Promise<string> {
  const client = await genOAuthClient();
  return client.generateAuthUrl({
    scope: ["profile", "email"],
  });
}

export async function genAccessToken(
  code: string,
): Promise<string> {
  const client = await genOAuthClient();
  const accessToken: IAccessToken = await client.getToken(code);

  return accessToken.tokens.access_token as string;
}

export async function genAccessTokenInfo(
  accessToken: string,
): Promise<IAccessTokenInfo> {
  return google
    .oauth2("v2")
    .tokeninfo({access_token: accessToken});
}

export async function genUserForAccessToken(
  accessToken: string,
): Promise<object> {
  const info: IAccessTokenInfo = await genAccessTokenInfo(accessToken);
  if (info.data.user_id === undefined) {
    throw new Error("Missing user id");
  }
  if (info.data.email === undefined) {
    throw new Error("Missing email");
  }
  return { id: info.data.user_id, email: info.data.email };
}
/* BESPOKE END <<custom>> */
