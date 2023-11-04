'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    highscore: DataTypes.INTEGER,
    art_score: DataTypes.INTEGER,
    celebrities_score: DataTypes.INTEGER,
    animals_score: DataTypes.INTEGER,
    music_score: DataTypes.INTEGER,
    sports_score: DataTypes.INTEGER,
    books_score: DataTypes.INTEGER,
    myth_score: DataTypes.INTEGER,
    history_score: DataTypes.INTEGER,
    nature_score: DataTypes.INTEGER,
    politics_score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};