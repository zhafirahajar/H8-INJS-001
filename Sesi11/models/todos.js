const db = require("../db.js");

class Todos {
	static read(req, res) {
		db.query(`select * from "todos"`, (err, result) => {
			if (err) {
				res.json(err);
			} else {
				res.status(201).json({
					msg: "Sukses",
					data: result.rows,
				});
			}
		});
	}

	static create(req, res) {
		let title = req.body.title;
		db.query(
			`INSERT INTO "todos" (title) VALUES ('${title}')`,
			(err, result) => {
				if (err) {
					res.json(err);
				} else {
					res.status(201).json({
						msg: "Sukses",
						data: result.rows,
					});
				}
			}
		);
	}

	static delete(req, res) {
		let id = req.params.id;
		db.query(
			`DELETE FROM "todos"
			 WHERE id = '${id}'`,
			(err, result) => {
				if (err) {
					res.json(err);
				} else {
					res.status(201).json({
						msg: "Sukses",
						data: result.rows,
					});
				}
			}
		);
	}

	static update(req, res) {
		let id = req.params.id;
		let title = req.body.title;
		db.query(
			`UPDATE "todos"
			 SET title = '${title}'
			 WHERE id = '${id}'
			 `,
			(err, result) => {
				if (err) {
					res.json(err);
				} else {
					res.status(201).json({
						msg: "Sukses",
						data: result.rows,
					});
				}
			}
		);
	}
}

module.exports = Todos;
