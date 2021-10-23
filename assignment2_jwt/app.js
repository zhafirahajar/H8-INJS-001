//require
const express = require("express");
const app = express();
const route = require("./routes/index");
const port = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.use(route);

//listen
app.listen(port, (req, res) => {
	console.log("listening on port ", port);
});
