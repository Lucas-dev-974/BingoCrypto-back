"use strict";

import { DataTypes, Model, Sequelize } from "sequelize";

import { sequelize } from "./index";
class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    verifiedEmail: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
  }
);

export default User;
