"use strict";

const { sequelize } = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Users", "password", {
			type: Sequelize.STRING,
		});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeColumn("Users", "password", {});
	},
};
