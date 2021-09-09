const http = require("http");
const fs = require("fs");
const axios = require("axios");
const port = 3000;

http
	.createServer((request, response) => {
		response.writeHead(200, {
			"Content-Type": "text/html",
		});

		response.write(fs.readFileSync("./index.html"));
		response.end();
	})
	.listen(port);

console.log("listening on port " + port);

axios({
	method: "get",
	url: "https://reqres.in/api/products/",
})
	.then((res) => {
		console.log(res.data);
	})
	.catch((err) => {
		console.log(err);
	});
