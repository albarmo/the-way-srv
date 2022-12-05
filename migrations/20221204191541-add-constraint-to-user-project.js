'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('UserProjects', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Fkey_Users_Carts',
      references: {
        table: 'Users',
        field: 'id',
      },
    })
    await queryInterface.addConstraint('UserProjects', {
      fields: ['projectId'],
      type: 'foreign key',
      name: 'Fkey_Products_Carts',
      references: {
        table: 'Projects',
        field: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'UserProjects',
      'Fkey_Users_Carts',
      {},
    )
    await queryInterface.removeConstraint(
      'UserProjects',
      'Fkey_Products_Carts',
      {},
    )
  },
}
