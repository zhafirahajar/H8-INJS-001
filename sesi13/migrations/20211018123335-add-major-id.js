"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.addColumn("Users", "major_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Users", {
				fields: ["major_id"],
				type: "foreign key",
				name: "user_major",
				references: {
					table: "Majors",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.removeConstraint("Users", "user_major", {}),
			queryInterface.removeColumn("Users", "major_id", {}),
		]);
	},
};
