const knex = require("knex");

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_NAME,
  },
  pool: {
    min: 1,
    max: 3,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
  },
  useNullAsDefault: true,
});

exports.db = db;