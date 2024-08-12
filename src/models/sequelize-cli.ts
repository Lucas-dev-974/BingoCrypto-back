import { Sequelize } from 'sequelize-typescript';
import { User } from './user';
// Initialisation de Sequelize
const sequelize = new Sequelize({
    username: "postgres",
    password: "root",
    database: "bingo_reunion",
    host: "127.0.0.1",
    dialect: "postgres",
    models: [User], // Déclarez vos modèles ici
});

export default sequelize;