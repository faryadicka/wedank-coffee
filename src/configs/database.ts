const { Pool } = require("pg");

const database = new Pool({
  user: "your_username",
  password: "your_password",
  host: "your_host",
  port: 5432, //default port
  database: "your_database_name",
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});

module.exports = database;
