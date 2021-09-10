//expressJS
//PERHATIKAN URUTAN KODING DI EXPRESS!

const express = require("express");
const axios = require("axios");
const fs = require("fs");
const data = require("./data.json");

const port = 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware (ada next, dan gaada response)
const fn1 = (req, res, next) => {
	//perhatikan urutan parameternya !
	console.log("masuk get /");
	next();
};

const fn2 = (req, res) => {
	//perhatikan urutan parameternya !
	console.log("masuk get / ke 2");
	res.send("yeay udah bisa masuk get /");
};

//HTTP Method

//put = update/edit data, di overwrite
//patch = update/edit data, hanya update yang diperlukan

//get = untuk minta data / buka halaman
app.get("/", fn1, fn2);

//post = untuk mengirim data , seperti login (ngirim uname dan pass)
app.post("/", fn1, (req, response) => {
	console.log(req.body);
	axios({
		method: "get",
		url: "https://reqres.in/api/products",
	})
		.then((res) => {
			response.send(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
});

//delete = untuk delete data
app.delete("/", fn1, (req, res) => {
	res.send("ini udah masuk delete");
});

app.patch("/", fn1, (req, res) => {
	res.send("ini udah masuk patch");
});

// URL CRUD USER

app.get("/users", (req, res) => {
	res.send(data);
});
app.get("/users/:id", (req, res) => {
	res.send(data[req.params.id - 1]);
});
app.post("/users", (req, res) => {
	new_user = {
		id: data.length + 1,
		email: req.body.email,
		first_name: req.body.depan,
		last_name: req.body.akhir,
	};
	data.push(new_user);
	fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
	res.send(`data baru = ${JSON.stringify(data, null, 2)}`);
});

app.delete("/users/delete/:id", (req, res) => {
	data.splice(req.params.id - 1);
	fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
	console.log(data);

	res.send(`
	DATA BERHASIL DI DELETE. DATA BARU =

	data baru = ${JSON.stringify(data, null, 2)}`);
});

app.patch("/users/edit/:id", (req, res) => {
	let check = data.find((e) => {
		if (e.id == req.params.id) {
			return e;
		}
	});

	if (check != undefined) {
		const index = check.id - 1;
		if (Object.keys(req.body).length != 0) {
			data[index].id = Number(req.params.id);
			console.log(req.body.email);
			req.body.email != ""
				? (data[index].email = req.body.email)
				: (data[index].email = data[index].email);

			req.body.depan != ""
				? (data[index].first_name = req.body.depan)
				: (data[index].first_name = data[index].first_name);

			req.body.belakang != ""
				? (data[index].last_name = req.body.belakang)
				: (data[index].last_name = data[index].last_name);

			res.send(`
			DATA BERHASIL DI EDIT, DATA BARU =
		
			data baru = ${JSON.stringify(data, null, 2)}`);

			fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
		} else {
			res.send("MASUKKAN VALUE UNTUK DIGANTI");
		}
	} else {
		res.send(`DATA TIDAK TERSEDIA`);
	}
});

app.listen(port, () => {
	console.log("listening on port:", port);
});
