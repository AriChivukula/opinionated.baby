module.exports = {
  "database": process.env.DB_NAME,
  "entities": [
    "src/server/entity/User.tsx"
  ],
  "host": process.env.DB_HOST,
  "password": process.env.DB_PASSWORD,
  "port": process.env.DB_PORT,
  "type": "postgres",
  "username": process.env.DB_USERNAME
}
