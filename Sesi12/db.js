const { Pool } = require("pg");

//untuk connect ke DB
const db = new Pool({
	user: "postgres",
	host: "localhost",
	database: "h8",
	password: "jepi",
	port: "5433",
});

module.exports = db;
