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
     let data = JSON.parse(fs.readFileSync("./data/user.json")).map(el => {
      return {
        name: el.name,
        gender: el.gender,
        dateOfBirth: el.dateOfBirth,
        email: el.email,
        password: el.password,
        role: el.role,
        clinicalLogId: el.clinicalLogId,
        createdAt: new Date (),
        updatedAt: new Date (),
      }
    })

    return queryInterface.bulkInsert('Users', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkInsert('Users', null)
  }
};
