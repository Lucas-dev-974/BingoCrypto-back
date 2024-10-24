import { Model, DataTypes, Optional } from "sequelize";
import { Sequelize } from "sequelize";
import { Participations } from "./Participations";

// Définir les attributs de Game
export interface GameAttributes {
  id: number;
  game_name: string;
  start_time: Date;
  end_time?: Date;
  drawn_numbers: any; // Typé en `any`, car c'est un JSON
}

// Ce type permet de créer un Game avec un id optionnel
interface GameCreationAttributes extends Optional<GameAttributes, "id"> {}

// Définir la classe Game qui hérite de Sequelize Model
export class Game
  extends Model<GameAttributes, GameCreationAttributes>
  implements GameAttributes
{
  public id!: number;
  public game_name!: string;
  public start_time!: Date;
  public end_time!: Date;
  public drawn_numbers!: any;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Définir les associations (vide pour l'instant)
  public static associate(models: any) {
    // Tu peux définir des relations ici si nécessaire, comme :
    Game.hasMany(models.Participations, {
      foreignKey: "gameId",
      as: "participations",
    });
  }

  static async game(gameID: number, include: boolean = false) {
    let includeQuery = include
      ? { include: [{ model: Participations, as: "participations" }] }
      : {};
    return await Game.findByPk(gameID, { ...includeQuery });
  }

  static async Games(options: any) {
    return await Game.findAll(options);
  }

  static async createGame(game: Omit<GameAttributes, "id">) {
    return await Game.create(game);
  }
}

// Initialiser le modèle
export function initGameModel(sequelize: Sequelize): typeof Game {
  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      game_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true, // Peut-être que le jeu n'a pas de fin définie au moment de la création
      },
      drawn_numbers: {
        type: DataTypes.JSON,
        allowNull: true, // Initialement peut être vide
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );

  return Game;
}

export default Game;
