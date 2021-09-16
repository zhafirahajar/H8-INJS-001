const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// app.set("view engine", "ejs");
// app.get("/", (req, res) => {
// 	res.render("index.ejs", {
// 		nama: "jepiy",
// 		umur: 21,
// 	});
// });

app.set("view engine", "pug");

//GET THE DATA
// axios({
// 	method: "get",
// 	url: "https://reqres.in/api/products",
// })
// 	.then((res) => {
// 		response.send(res.data);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

app.get("/", async (req, res) => {
	const query = await axios.get("https://randomuser.me/api/?results=9");
	res.render("index", { users: query.data.results });
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
