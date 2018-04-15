import { getManager } from 'typeorm';

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
    const entityManager = getManager();
    const user = await entityManager.findOneById(User, 1);
    expect(user).not.toBeNull();
  }
);
