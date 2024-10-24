import { Model, DataTypes, Optional } from "sequelize";
import { Sequelize } from "sequelize";
import Game, { GameAttributes } from "./Games";
import { Participations } from "./Participations";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  last_name: string;
  address: string;
  phone: string;
  birthday: string;
  postal_code: number;
  password: string;
  verified_email: boolean;
  country: string;
  city: string;
}

// Type pour les attributs qui peuvent être facultatifs lors de la création
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Définir la classe User qui hérite de Sequelize Model
export class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public last_name!: string;
  public address!: string;
  public phone!: string;
  public birthday!: string;
  public postal_code!: number;
  public password!: string;
  public verified_email!: boolean;
  public country!: string;
  public city!: string;

  // Timestamps par défaut créés par Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Définir les associations
  static associate(models: any) {
    // Un utilisateur peut avoir plusieurs BingoCards et Participations
    Users.hasMany(models.BingoCards, { foreignKey: "userId" });
    Users.hasMany(models.Participations, { foreignKey: "userId" });
  }

  // * Maybe review type of options
  static async get(id: number, options: boolean = false) {
    const includes = options
      ? { exclude: ["password"] }
      : ["id", "name", "last_name", "email", "password"];

    return await Users.findByPk(id, { attributes: includes });
  }
}

// Initialiser le modèle
export function initUserModel(sequelize: Sequelize): typeof Users {
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified_email: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return Users;
}

export default Users;
