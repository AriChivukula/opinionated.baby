import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

export const getOAuthClient =
  (): OAuth2Client => new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

export const getLoginURL =
  (): string => getOAuthClient()
    .generateAuthUrl({
      scope: ['profile', 'email'],
    });

export const genAccessTokenInfo =
  async (access_token: string): Promise<Object> => await google
    .oauth2('v2')
    .tokeninfo({access_token: access_token});
