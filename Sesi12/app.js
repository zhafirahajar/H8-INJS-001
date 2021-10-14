const express = require("express");

// const todo = require("./models/market");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//URL

//RUNNING SERVER
app.listen(port, () => {
	console.log("listening on port " + port);
});
