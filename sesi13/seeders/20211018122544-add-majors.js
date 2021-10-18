"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let arr = [
			{
				name: "kalkulus",
				faculty: "matematika",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "alpro",
				faculty: "SI",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];
		await queryInterface.bulkInsert("Majors", arr);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Majors", null, {});
	},
};
