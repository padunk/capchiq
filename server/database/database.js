const Pool = require("pg").Pool;

const userPool = new Pool({
    user: "postgres",
    password: "@Susilia121184",
    host: "localhost",
    port: 5432,
    database: "capchiq",
});

module.exports = userPool;
