const Pool = require("pg").Pool;

const userPool = new Pool({
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "capchiq",
});

module.exports = userPool;
