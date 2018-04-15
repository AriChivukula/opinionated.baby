// @flow

import { Sequelize, STRING } from 'sequelize';

const User = (pool: Sequelize) => {
  var User = pool.define(
    'User',
    {
      googleID: {
        allowNull: false,
        unique: true,
        type: STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: STRING
      },
    },
    {
    }
  );
  return User;
};

export default User;
