const fs = require("fs");
const customerData = require("../data/customer.json");
const bcrypt = require("bcrypt");
var path = require("path");

class customerControler {
	static create(req, res) {
		try {
			let salt = bcrypt.genSaltSync(10); //seperti secret token di jwt
			let hash = bcrypt.hashSync(req.body.password, salt);
			let new_customer = {
				id: customerData.length + 1,
				email: req.body.email,
				password: hash,
				age: req.body.name,
			};

			customerData.push(new_customer);
			fs.writeFileSync(
				path.join(__dirname, "../data/customer.json"),
				JSON.stringify(customerData, null, 2)
			);
			res.status(201).json({ status: "Customer Baru Berhasil Dibuat" });
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	}
}

module.exports = customerControler;
