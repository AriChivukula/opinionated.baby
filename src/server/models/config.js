// @flow

export const database = String(process.env.DB_DB);
export const username = String(process.env.DB_USERNAME);
export const password = String(process.env.DB_PASSWORD);
export const dialect = 'postgres';
export const host = String(process.env.DB_HOST);
export const port = parseInt(process.env.DB_PORT);
export const operatorsAliases = false;
