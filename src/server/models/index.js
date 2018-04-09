// @flow

import path from 'path';
import sequelize from 'sequelize';
import {
  database,
  username,
  password,
  dialect,
  host,
  port,
  operatorsAliases
} from './config.js';
import UserFn from './user.js';

const pool = new sequelize(
  database,
  username,
  password,
  {
    dialect,
    host,
    port,
    operatorsAliases
  }
);

const User = UserFn(pool);

const db = {
  User: User,
};

Object.keys(db).forEach(modelName => {
  db[modelName].associate(db);
});

export { User };
