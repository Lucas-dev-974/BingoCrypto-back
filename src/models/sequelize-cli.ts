import { Sequelize } from 'sequelize-typescript';
import { User } from './User';
import { BingoCard } from './BingoCard';
import { Games } from './Games';
import { DrawnNumber } from './DrawnNumber';

// Initialisation de Sequelize
const sequelize = new Sequelize({
    username: "postgres",
    password: "root",
    database: "bingo_reunion",
    host: "127.0.0.1",
    dialect: "postgres",
    models: [User, BingoCard, Games, DrawnNumber], // Déclarez vos modèles ici
});

export default sequelize;