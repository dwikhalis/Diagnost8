'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync("./data/log.json")).map(el => {
      return {
        logDate: el.logDate,
        UserId: el.UserId,
        MedicineId: el.MedicineId,
        DiseaseId: el.DiseaseId,
        createdAt: new Date (),
        updatedAt: new Date (),
      }
    })

    return queryInterface.bulkInsert('Logs', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkInsert('Logs', null)
  }
};
