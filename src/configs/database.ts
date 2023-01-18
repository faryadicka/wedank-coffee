const { Pool } = require("pg");
const { USER_DB, PASSWORD_DB, HOST_DB, PORT_DB, NAME_DB } = process.env;

const database = new Pool({
  user: USER_DB,
  password: PASSWORD_DB,
  host: HOST_DB,
  port: PORT_DB, //default port
  database: NAME_DB,
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});

module.exports = database
