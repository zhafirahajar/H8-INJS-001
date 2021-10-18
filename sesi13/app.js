const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const { User } = require("./models");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//URL

//START PORT
app.listen(port, () => {
	console.log("listening on port ", port);
});
