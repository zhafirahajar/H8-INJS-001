const express = require("express");
const app = express();
const port = 3000;

//middleware
app.use(express.static("public"));
app.use((req, res, next) => {
	console.log("halo ini middleware pertama");
	next();
});

//manipulasi path
let path = __dirname.split("/");
path.pop();
path = path.join("/");

//----express static----
app.get("/", (req, res) => {
	res.send("halo kamu berada di URL /");
});

//middleware yang langsung nempel
app.get(
	"/mid",
	(req, res, next) => {
		console.log("halo ini middleware URL /mid");
		next();
	},
	(req, res) => {
		res.send("ini udah melwati 2 middleware");
	}
);

//middleware auth untuk mengecek token
app.use((req, res, next) => {
	if (req.headers.token !== undefined) {
		console.log("Udah bisa masuk middleware AUTH!");
		next();
	} else {
		next(new Error("Unauthetnticated!"));
	}
});

app.get("/login", (req, res) => {
	// res.sendFile ("public/dashboard.html", { root: __dirname });
	res.sendFile(path + "/" + "copy_public" + "/dashboard.html"); // ngelewati middleware pertama dan auth (2x iterasi)
	// res.send("coba"); // ngelewati middleware pertama dan auth (1x iterasi)
});

app.get("/contoh_error", (req, res, next) => {
	next(new Error("Ini error karena disengaja error"));
});

//error handling middleware
app.use((err, req, res, next) => {
	console.log("---------- INI ERROR : ------------");
	console.log(err);
	res.status(500).send(err.message);
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
