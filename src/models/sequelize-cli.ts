import { Sequelize } from 'sequelize-typescript';
import { User } from './user';
import { BingoCard } from './BingoCard';

// Initialisation de Sequelize
const sequelize = new Sequelize({
    username: "postgres",
    password: "root",
    database: "bingo_reunion",
    host: "127.0.0.1",
    dialect: "postgres",
    models: [User, BingoCard], // Déclarez vos modèles ici
});

export default sequelize;