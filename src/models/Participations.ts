import { Model, DataTypes, Optional } from "sequelize";
import { Sequelize } from "sequelize";

// Définir les attributs de Participation
interface ParticipationAttributes {
  id: number;
  participation_time?: Date | null;
  userId: number; // Clé étrangère vers Users
  gameId: number; // Clé étrangère vers Games
}

// Ce type permet de créer des Participation avec un id optionnel
interface ParticipationCreationAttributes
  extends Optional<ParticipationAttributes, "id"> {}

// Définir la classe Participation qui hérite de Sequelize Model
export class Participations
  extends Model<ParticipationAttributes, ParticipationCreationAttributes>
  implements ParticipationAttributes
{
  public id!: number;
  public participation_time!: Date;
  public userId!: number;
  public gameId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Définir les associations
  public static associate(models: any) {
    // Une participation appartient à un utilisateur
    Participations.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "User",
    });

    // Une participation appartient à un jeu
    Participations.belongsTo(models.Games, {
      foreignKey: "gameId",
      as: "Game",
    });

    // Une participation peut avoir plusieurs cartes de bingo
    Participations.hasMany(models.BingoCards, {
      foreignKey: "participationId",
    });
  }
}

// Initialiser le modèle
export function initParticipationModel(
  sequelize: Sequelize
): typeof Participations {
  Participations.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      participation_time: {
        type: DataTypes.DATE,
        allowNull: true,
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
      modelName: "Participations",
    }
  );

  return Participations;
}
