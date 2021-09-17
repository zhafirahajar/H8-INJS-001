const axios = require("axios");
const fs = require("fs");
const data = require("./data.json");

const getUser = (id) => {
	if (id <= data.length) {
		user = [];
		user.push(data[id - 1]);
		return user;
	} else {
		return data;
	}
};

const createUser = (email, first, last, avatar) => {
	avatar == undefined ? (avatar = null) : avatar;
	new_user = {
		id: data.length + 1,
		email,
		first_name: first,
		last_name: last,
		avatar,
	};
	data.push(new_user);
	fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
	return data;
};

const editUser = (id, email, first, last, avatar) => {
	let check = getUser(id);
	if (check != undefined) {
		const index = check.id - 1;
		if (arguments.length === 0) {
		} else {
			data[index].id = id;

			email != ""
				? (data[index].email = email)
				: (data[index].email = data[index].email);

			first != ""
				? (data[index].first_name = first)
				: (data[index].first_name = data[index].first_name);

			last != ""
				? (data[index].last_name = last)
				: (data[index].last_name = data[index].last_name);

			avatar != ""
				? (data[index].avatar = avatar)
				: (data[index].avatar = data[index].avatar);

			fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
		}
	} else {
	}
};

const deleteUser = (id) => {
	data.splice(id - 1, 1);
	fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
	// return data;
};

module.exports = {
	getUser,
	createUser,
	editUser,
	deleteUser,
};
