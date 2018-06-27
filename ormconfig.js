module.exports = {
  "database": process.env.TF_VAR_DB_NAME,
  "entities": [
    "src/server/entity/*.ts"
  ],
  "host": process.env.TF_VAR_DB_HOST,
  "password": process.env.TF_VAR_DB_PASSWORD,
  "port": process.env.TF_VAR_DB_PORT,
  "type": "postgres",
  "username": process.env.TF_VAR_DB_USERNAME
}
