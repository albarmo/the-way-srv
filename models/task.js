'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Project, {
        targetKey: 'id',
        foreignKey: 'projectId',
      })
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.status = false
        },
      },
      sequelize,
      modelName: 'Task',
    },
  )
  return Task
}
