'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasMany(models.UserProject, {
        sourceKey: 'id',
        foreignKey: 'projectId',
      })
      Project.hasMany(models.Task, {
        sourceKey: 'id',
        foreignKey: 'projectId',
      })
      Project.belongsToMany(models.User, {
        through: models.UserProject,
        foreignKey: 'projectId',
      })
    }
  }
  Project.init(
    {
      title: DataTypes.STRING,
      descripton: DataTypes.STRING,
      image: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.status = 'On Going'
        },
      },
      sequelize,
      modelName: 'Project',
    },
  )
  return Project
}
