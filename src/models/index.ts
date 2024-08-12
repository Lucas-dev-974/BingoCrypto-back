import { Sequelize } from "sequelize";
import { User } from "./user";


const database = process.env.DATABASE || "database";
const userDB = process.env.USER_DB || "user_db";
const passwordDB = process.env.PASSWORD_DB || "passord_db";
const hostDB = process.env.HOST_DB || "localhost";
const dialectDB = process.env.DIALECT_DB || "postgres";

const sequelize = new Sequelize({
  dialect: "postgres",
  username: userDB,
  password: passwordDB,
  database: database,
  host: hostDB
});

const models = {
  User,
};

export { sequelize, models };
