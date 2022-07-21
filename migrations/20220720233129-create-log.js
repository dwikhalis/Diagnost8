'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logDate: {
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      MedicineId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Medicines',
          key: 'id'
        }
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Diseases',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Logs');
  }
};