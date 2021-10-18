const e = require("express");
const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const { User, Major } = require("./models");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//URL
app.get("/", (req, res) => {
	res.json({
		page: "Home",
	});
});
app.get("/users", (req, res) => {
	User.findAll({
		include: [Major],
	})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/users", (req, res) => {
	let input = {
		name: req.body.name,
		age: req.body.age,
		major_id: req.body.major_id,
	};
	User.create(input)
		.then((data) => {
			res.status(201).json(data);
		})
		.catch((err) => {
			let errCode = 500;
			if (err.name.includes("Sequelize")) {
				errCode = 400;
			}
			res.status(errCode).json(err);
		});
});

app.get("/users/:id", (req, res) => {
	User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((data) => {
			if (data == null) {
				res.status(404).json(data);
			} else {
				res.status(200).json(data);
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

app.post("/users/:id/edit", (req, res) => {
	User.update(
		{
			name: req.body.name,
			age: req.body.age,
			major_id: req.body.major_id,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((data) => {
			res.status(201).json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

app.post("/users/:id/delete", (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((data) => {
			if (data > 0) {
				res.status(200).json(data);
			} else {
				res.status(404).json(data);
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

//START PORT
app.listen(port, () => {
	console.log("listening on port ", port);
});
