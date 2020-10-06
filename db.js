const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Sweden",
  port: 5432,
  database: "projectfinaldb"
});

module.exports = pool;