'use strict'

const { hashPassword } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          fullname: 'superadmin',
          nickname: 'tw-admin',
          email: 'administrator@tw.io',
          password: hashPassword('TW2022!'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          fullname: 'Albar Moerhamsa',
          nickname: 'albarms',
          gender: 'male',
          email: 'moerhamsa@gmail.com',
          password: hashPassword('Albar!'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          fullname: 'Alyaa Atiqoh',
          nickname: 'tw-admin',
          gender: 'female',
          email: 'alyaaatiqoh123@gmail.com',
          password: hashPassword('Alyaa!'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
