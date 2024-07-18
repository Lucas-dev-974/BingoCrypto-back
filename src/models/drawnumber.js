'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DrawNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DrawNumber.init({
    game_id: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    drawn_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DrawNumber',
  });
  return DrawNumber;
};