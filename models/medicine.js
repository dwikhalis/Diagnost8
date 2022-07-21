'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicine.belongsToMany(models.Disease, {
        through: models.Log,
      })
      // ,
      // Medicine.belongsTo(models.Log, {
      //   foreignKey: 'id'
      // })
    }
  }
  Medicine.init({
    name: DataTypes.STRING,
    company: DataTypes.STRING,
    regDate: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};