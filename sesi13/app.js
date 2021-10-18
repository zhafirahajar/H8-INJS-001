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

//START PORT
app.listen(port, () => {
	console.log("listening on port ", port);
});
