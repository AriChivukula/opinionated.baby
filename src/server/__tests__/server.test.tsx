import { getLoginURL, genAccessTokenInfo } from '../google';
import { User } from '../entity/user';

test(
  'getLoginURL',
  async () => {
    const url = getLoginURL();
    expect(url).toMatch('/accounts.google.com/');
  }
);

test(
  'genAccessTokenInfo',
  async () => {
    await expect(genAccessTokenInfo('ERROR')).rejects.toThrow(Error);
  }
);

test(
  'User',
  async () => {
    const result = await User.findOrCreate(
      {where: {googleID: 'TEST', email: 'TEST'}}
    );
    expect(result[0]).not.toBeNull();
  }
);
