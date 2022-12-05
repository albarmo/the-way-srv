'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Projects',
      [
        {
          id: 1,
          title: 'One Day, Forever',
          descripton: 'Albar Alyaa',
          image: 'unset',
          status: 'On Going',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {})
  },
}
