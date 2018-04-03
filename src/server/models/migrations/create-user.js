// @flow

import sequelize, { QueryInterface } from 'sequelize';

export const up = (query: QueryInterface) => {
  return query.createTable(
    'Users',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER
      },
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
      createdAt: {
        allowNull: false,
        type: sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE
      }
    }
  );
};

export const down = (query: QueryInterface) => {
  return query.dropTable('Users');
};
