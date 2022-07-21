'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.belongsToMany(models.Medicine, {
        through: models.Log,
      })
    }
  }
  Disease.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name is required"
        },
        notNull: {
          msg: "name is required"
        }
      }
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "diagnosis is required"
        },
        notNull: {
          msg: "diagnosis is required"
        }
      }
    },
    procedure: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "procedure is required"
        },
        notNull: {
          msg: "procedure is required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "status is required"
        },
        notNull: {
          msg: "status is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};