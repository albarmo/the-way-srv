'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'user-project-1',
      },
      projectId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: 'Projects',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'project-user-1',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserProjects')
  },
}
