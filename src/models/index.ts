import { Sequelize } from "sequelize";
import { initUserModel } from "./User";
import Game, { initGameModel } from "./Games";
import { initParticipationModel } from "./Participations";
import { initWinModel } from "./Win";
import { initBingoCardsModel } from "./BingoCards";

// Initialiser l'instance Sequelize
export const sequelize = new Sequelize({
  dialect: "postgres", // ou 'mysql', selon ta base de données
  database: "bingo_reunion",
  username: "postgres",
  password: "root",
});

const Users = initUserModel(sequelize);
const Games = initGameModel(sequelize);
const Participations = initParticipationModel(sequelize);
const Win = initWinModel(sequelize);
const BingoCards = initBingoCardsModel(sequelize);

// Définir les associations après l'initialisation des modèles
Users.associate({ Participations, BingoCards });
Participations.associate({ Users, Games, BingoCards });
BingoCards.associate({ Users, Participations });
Win.associate({ Users, Games });
Games.associate({ Participations });

// user.associate({ win });
// win.associate({ user, game });
// game.associate({ win });

// Synchronisation avec la base de données
sequelize
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((error) => console.error("Error syncing the database:", error));
