'use strict';

const { formatAge, formatDate } = require('../helpers/helper')

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
    }

    get formatDate() {
      return formatDate(this.regDate)
    }
  }
  Medicine.init({
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
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "company name is required"
        },
        notNull: {
          msg: "company name is required"
        }
      }
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "date is required"
        },
        notNull: {
          msg: "date is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "description is required"
        },
        notNull: {
          msg: "description is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Medicine',
    hooks: {
      beforeCreate: function(medicine) {
        medicine.company = `PT. ${medicine.company}`
      }
    }
  });
  return Medicine;
};