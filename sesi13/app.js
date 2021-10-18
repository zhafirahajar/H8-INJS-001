const express = require("express");
const app = express();
const port = 3000;
const route = require("./routes/index");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//URL
app.use(route);

//START PORT
app.listen(port, () => {
	console.log("listening on port ", port);
});
