'use strict';

const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync("./data/profile.json")).map(el => {
      return {
        name: el.name,
        gender: el.gender,
        dateOfBirth: el.dateOfBirth,
        createdAt: new Date (),
        updatedAt: new Date (),
      }
    })

    return queryInterface.bulkInsert('Profiles', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkInsert('Profiles', null)
  }
};

