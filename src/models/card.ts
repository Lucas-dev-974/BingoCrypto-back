// "use strict";

// import { DataTypes, Model, Sequelize } from "sequelize";

// import { sequelize } from "./index";
// class BingoCard extends Model {
//   /**
//    * Helper method for defining associations.
//    * This method is not a part of Sequelize lifecycle.
//    * The `models/index` file will call this method automatically.
//    */
//   static associate(models: any) {
//     // define association here
//   }
// }
// BingoCard.init(
//   {
//     user_id: DataTypes.INTEGER,
//     numbers: DataTypes.JSON,
//     created_at: DataTypes.DATE,
//   },
//   {
//     sequelize,
//     modelName: "BingoCard",
//     tableName: "BingoCards",
//   }
// );

// export default BingoCard;

import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface CardAttributes {
  card_id?: number;
  user_id: number;
  numbers: object;
  created_at: Date;
}

interface CardCreationAttributes extends Optional<CardAttributes, "card_id"> {}

class Card
  extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes
{
  public card_id!: number;
  public user_id!: number;
  public numbers!: object;
  public created_at!: Date;

  public static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Card.init(
    {
      card_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numbers: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Card",
      tableName: "Cards",
      timestamps: false,
    }
  );

  return Card;
};
