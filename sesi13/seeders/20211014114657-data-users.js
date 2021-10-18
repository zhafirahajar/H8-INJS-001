"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		let arr = [
			{
				name: "zhafira",
				age: 21,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "hajar",
				age: 21,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];
		await queryInterface.bulkInsert("Users", arr);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Users", null, {});
	},
};
