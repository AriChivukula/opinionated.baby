// @flow

import sequelize from 'sequelize';

const User = (pool: sequelize) => {
  var User = pool.define(
    'User',
    {
      googleID: {
        allowNull: false,
        unique: true,
        type: sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: sequelize.STRING
      },
    },
    {
    }
  );
  User.associate = (models: Object) => {
  };
  return User;
};

export default User;
