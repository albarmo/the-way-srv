'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Tasks', {
      fields: ['projectId'],
      type: 'foreign key',
      name: 'Fkey_Project_Tasks',
      references: {
        table: 'Projects',
        field: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Tasks',
      'Fkey_UseFkey_Project_Tasksr_Projects',
      {},
    )
  },
}
