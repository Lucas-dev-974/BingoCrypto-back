import { Model, DataTypes, Optional } from "sequelize";
import { Sequelize } from "sequelize";

// Définir les attributs de Win
interface WinAttributes {
  id: number;
  amount: number;
  win_time: Date;
  userId: number; // Clé étrangère vers Users
  gameId: number; // Clé étrangère vers Games
}

// Ce type permet de créer un Win avec un id optionnel
interface WinCreationAttributes extends Optional<WinAttributes, "id"> {}

// Définir la classe Win qui hérite de Sequelize Model
export class Win
  extends Model<WinAttributes, WinCreationAttributes>
  implements WinAttributes
{
  public id!: number;
  public amount!: number;
  public win_time!: Date;
  public userId!: number;
  public gameId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Définir les associations
  public static associate(models: any) {
    // Un gain appartient à un utilisateur
    Win.belongsTo(models.Users, { foreignKey: "userId" });

    // Un gain appartient à un jeu
    Win.belongsTo(models.Games, { foreignKey: "gameId" });
  }
}

// Initialiser le modèle
export function initWinModel(sequelize: Sequelize): typeof Win {
  Win.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      win_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Table des utilisateurs
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Games", // Table des jeux
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Win",
    }
  );

  return Win;
}
