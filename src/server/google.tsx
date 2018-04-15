import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

type AccessTokenInfo = {
  data: {
    user_id: string,
    email: string
  }
}

const getOAuthClient = (): OAuth2Client => new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

export const getLoginURL =
  (): string => getOAuthClient()
    .generateAuthUrl({
      scope: ['profile', 'email'],
    });

export const genAccessToken =
  async (code: string): Promise<GetTokenResponse> => await getOAuthClient()
    .getToken(code);

export const genAccessTokenInfo =
  async (access_token: string): Promise<AccessTokenInfo> => await google
    .oauth2('v2')
    .tokeninfo({access_token: access_token});
