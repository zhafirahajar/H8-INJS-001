"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.belongsTo(models.Major, { foreignKey: "major_id" });
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			//add validation at javacsript levels
			age: {
				type: DataTypes.INTEGER,
				validate: {
					min: {
						args: 17,
						msg: "Minimal berumur 17 tahun",
					},
					isInt: true,
				},
			},
			major_id: DataTypes.INTEGER,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
