'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Win extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Win.init({
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    win_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Win',
  });
  return Win;
};