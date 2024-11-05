const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.DEV_HOST,
  user: process.env.DEV_USER,
  database: process.env.DEV_DB,
  password: process.env.DEV_PASSWORD,
  port: process.env.DEV_DB_PORT,
});
