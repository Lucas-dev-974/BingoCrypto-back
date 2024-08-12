// "use strict";

// import { DataTypes, Model, Sequelize } from "sequelize";

// import { sequelize } from "./index";
// class User extends Model {
//   /**
//    * Helper method for defining associations.
//    * This method is not a part of Sequelize lifecycle.
//    * The `models/index` file will call this method automatically.
//    */
//   static associate(models: any) {
//     // define association here
//   }
// }

// User.init(
//   {
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     verifiedEmail: DataTypes.BOOLEAN,
//     password: DataTypes.STRING,
//   },
//   {
//     sequelize,
//     modelName: "User",
//     tableName: "Users",
//   }
// );

// export default User;
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
// import { Post } from './Post';

@Table
export class User extends Model<User> {
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  verifiedEmail?: boolean;

  @Column
  password!: string;


  // @HasMany(() => Post)
  // posts!: Post[];
}