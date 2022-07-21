'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Log.hasMany(models.Medicine, {
      //   foreignKey: 'MedicineId'
      // }),
      // Log.hasMany(models.Disease, {
      //   foreignKey: 'DiseaseId'
      // }),
      Log.hasOne(models.User, {
        foreignKey: 'id'
      })
    }
  }
  Log.init({
    logDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    MedicineId: DataTypes.INTEGER,
    DiseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};