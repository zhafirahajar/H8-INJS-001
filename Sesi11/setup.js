// db.query('query',(callback))
const db = require("./db");

db.query("select now()", (err, res) => {
	if (err) {
		console.log(err);
	} else {
		console.log(res.rows);
	}
});
