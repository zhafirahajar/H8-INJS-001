const { User, Major } = require("../models");
const bcrypt = require("bcrypt");

class userController {
	static async getAll(req, res) {
		console.log(req.headers.token);
		// User.findAll({
		// 	include: [Major],
		// })
		// 	.then((data) => {
		// 		res.json(data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		const userList = await User.findAll({ include: [Major] });
		res.json(userList);
	}

	static async getOne(req, res) {
		// User.findOne({
		// 	where: {
		// 		id: req.params.id,
		// 	},
		// })
		// 	.then((data) => {
		// 		if (data == null) {
		// 			res.status(404).json(data);
		// 		} else {
		// 			res.status(200).json(data);
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		res.status(500).json(err);
		// 	});

		const oneUser = await User.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (oneUser == null) {
			res.status(404).json({ message: "User Not Found" });
		} else {
			res.status(200).json(oneUser);
		}
	}

	static create(req, res) {
		let salt = bcrypt.genSaltSync(10); //seperti secret token di jwt
		let hash = bcrypt.hashSync(req.body.password, salt);
		let input = {
			name: req.body.name,
			age: req.body.age,
			major_id: req.body.major_id,
			password: hash, //bcrypt
		};
		User.create(input)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				let errCode = 500;
				if (err.name.includes("Sequelize")) {
					errCode = 400;
				}
				res.status(errCode).json(err);
			});
	}

	static edit(req, res) {
		User.update(
			{
				name: req.body.name,
				age: req.body.age,
				major_id: req.body.major_id,
				password: req.body.password,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static delete(req, res) {
		User.destroy({
			where: {
				id: req.params.id,
			},
		})
			.then((data) => {
				if (data > 0) {
					res.status(200).json(data);
				} else {
					res.status(404).json(data);
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
}

module.exports = userController;
