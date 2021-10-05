const { Pool } = require("pg");

//untuk connect ke DB
const db = new Pool({
	user: "postgres",
	host: "localhost",
	database: "todos_app",
	password: "jepi",
	port: "5433",
});

module.exports = db;
