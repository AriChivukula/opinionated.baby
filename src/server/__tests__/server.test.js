// @flow

import 'babel-polyfill';
import { getLoginURL } from '../google.js';
import { User } from '../models/index.js';

test(
  'getLoginURL',
  async () => {
    expect(getLoginURL()).toMatch('/accounts.google.com/');
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
