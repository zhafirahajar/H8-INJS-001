const http = require("http");
const mod = require("./function");

const port = 1234;

http
	.createServer((req, res) => {
		res.writeHead(200, {
			"Content-type": "text/html",
		});
		res.write("halo ini dari write");
		res.end(" halo semua! ini dari port " + port);
	})
	.listen(port);

console.log("listening on port " + port);

mod.luasLingkaran(10); //bukti bahwa http bersikap async
