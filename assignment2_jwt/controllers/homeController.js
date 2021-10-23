const customerData = require("../data/customer.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class homeController {
	static home(req, res) {
		res.status(200).json({ Page: "home page" });
	}

	static login(req, res) {
		let customer = customerData.find((data) => {
			if (data.email == req.body.email) {
				return data;
			}
		});

		if (customer == undefined) {
			res.status(401).json({ message: "Username or password invalid" });
		} else {
			let passCompare = bcrypt.compareSync(
				req.body.password,
				customer.password
			);
			if (passCompare == true) {
				let token = jwt.sign(JSON.stringify(customer, null, 2), "secretKey");
				res.status(200).json({ message: "Customer berhasil login", token });
			} else {
				res.status(401).json({ message: "Username or password invalid" });
			}
		}
	}

	static jwtMiddleware(req, res, next) {
		try {
			let token = req.headers.token;
			let decoded = jwt.verify(token, "secretKey");
			let customer = customerData.find((data) => {
				if ((decoded.email = data.email)) {
					return data;
				}
			});

			if (customer == undefined) {
				res.status(401).json({ message: "Invalid credentials" });
			} else {
				next();
			}
		} catch (err) {
			res.status(500).json(err);
		}
	}
}

module.exports = homeController;
