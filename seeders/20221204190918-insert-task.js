'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          id: 1,
          title: 'Item One',
          description: 'Description item one',
          price: 200000,
          status: true,
          image: '',
          projectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {})
  },
}
