import { Model, DataTypes, Optional } from "sequelize";
import { Sequelize } from "sequelize";

// Définir les attributs de BingoCards
interface BingoCardAttributes {
  id: number;
  numbers: any; // Cela peut être plus précisément typé selon la structure JSON
  userId: number; // Clé étrangère vers Users
  participationId: number; // Clé étrangère vers Participations
}

// Ce type permet de créer une BingoCard avec un id optionnel
interface BingoCardCreationAttributes
  extends Optional<BingoCardAttributes, "id"> {}

// Définir la classe BingoCards qui hérite de Sequelize Model
export class BingoCards
  extends Model<BingoCardAttributes, BingoCardCreationAttributes>
  implements BingoCardAttributes
{
  public id!: number;
  public numbers!: any;
  public userId!: number;
  public participationId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Définir les associations
  public static associate(models: any) {
    // Une carte de bingo appartient à un utilisateur
    BingoCards.belongsTo(models.Users, { foreignKey: "userId" });

    // Une carte de bingo appartient à une participation
    BingoCards.belongsTo(models.Participations, {
      foreignKey: "participationId",
    });
  }
}

// Initialiser le modèle
export function initBingoCardsModel(sequelize: Sequelize): typeof BingoCards {
  BingoCards.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      numbers: {
        type: DataTypes.JSON,
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
      participationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Participations", // Table des participations
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "BingoCards",
    }
  );

  return BingoCards;
}
