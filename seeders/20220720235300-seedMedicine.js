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
     let data = JSON.parse(fs.readFileSync("./data/medicine.json")).map(el => {
      return {
        name: el.name,
        company: el.company,
        regDate: el.regDate,
        description: el.description,
        createdAt: new Date (),
        updatedAt: new Date (),
      }
    })

    return queryInterface.bulkInsert('Medicines', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkInsert('Medicines', null)
  }
};
