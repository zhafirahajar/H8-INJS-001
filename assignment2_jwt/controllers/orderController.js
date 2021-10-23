const fs = require("fs");
const orderData = require("../data/order.json");
const customerData = require("../data/customer.json");
var path = require("path");
const jwt = require("jsonwebtoken");

class orderController {
	static create(req, res) {
		let token = req.headers.token;
		let decoded = jwt.verify(token, "secretKey");

		let new_order = {
			id: orderData.length + 1,
			customer: decoded.id,
			description: req.body.des,
		};

		let check = customerData.find((data) => {
			if (data.id == decoded.id) {
				return data;
			}
		});

		if (check != undefined) {
			orderData.push(new_order);
			fs.writeFileSync(
				path.join(__dirname, "../data/order.json"),
				JSON.stringify(orderData, null, 2)
			);
			res.status(201).json({
				message: `Oder baru untuk customer ${decoded.id} berhasil dibuat`,
			});
		} else {
			res
				.status(401)
				.json({ message: "You are not a customer, please login first." });
		}
	}

	static getById(req, res) {
		let token = req.headers.token;
		let decoded = jwt.verify(token, "secretKey");

		let check = orderData.find((data) => {
			if (data.id == req.params.id && data.customer == decoded.id) {
				return data;
			}
		});

		if (check == undefined) {
			res.status(404).json({ message: "Order data not found" });
		} else {
			res.status(200).json(check);
		}
	}
}

module.exports = orderController;
