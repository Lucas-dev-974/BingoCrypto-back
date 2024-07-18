'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Participation.init({
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER,
    participation_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Participation',
  });
  return Participation;
};