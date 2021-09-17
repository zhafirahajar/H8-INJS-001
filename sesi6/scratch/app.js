const express = require("express");
const main = require("./main.js");
const data = require("./data.json");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	if (Object.keys(req.query).length < 1) {
		userList = main.getUser();
		res.render("index", { userList });
	} else {
		userList = main.getUser(req.query.id);
		res.render("index", { userList });
	}
});

app.get("/user/get/:id", (req, res) => {
	main.getUser(req.params.id);
	res.redirect("/");
});

app.get("/user/edit/:id", (req, res) => {
	user = data[req.params.id - 1];
	res.render("edit.ejs", { user });
});

app.post("/user/editAction/:id", (req, res) => {
	main.editUser(
		req.params.id,
		req.body.email,
		req.body.first,
		req.body.last,
		req.body.avatar
	);
	res.redirect("/");
});

app.get("/user/delete/:id", (req, res) => {
	test = main.deleteUser(req.params.id);
	console.log(test);
	res.redirect("/");
});

app.get("/user/create", (req, res) => {
	res.render("create.ejs");
});

app.post("/user/createAction", (req, res) => {
	main.createUser(
		req.body.email,
		req.body.first,
		req.body.last,
		req.body.avatar
	);
	res.redirect("/");
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
