require("dotenv").config();

import fs from "fs";
import path from "path";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

const basename = path.basename(__filename);

const db: any = {};

const database = process.env.DATABASE || "database";
const userDB = process.env.USER_DB || "user_db";
const passwordDB = process.env.PASSWORD_DB || "passord_db";
const hostDB = process.env.HOST_DB || "localhost";
const dialectDB = process.env.DIABLECT_DB || "postres";

console.log("database:", database, userDB, passwordDB);

export const initializeDatabase = async (): Promise<typeof db> => {
  let sequelize: Sequelize = new Sequelize(database, userDB, passwordDB, {
    dialect: dialectDB as Dialect,
    host: hostDB,
  });

  const models = fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".ts" &&
        file.indexOf(".test.ts") === -1
      );
    })
    .map((file) => require(path.join(__dirname, file)).default);

  console.log("models:", models);

  sequelize.addModels(models);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  await sequelize.sync();
  return db;
};
