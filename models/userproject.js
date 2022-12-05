'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    static associate(models) {
      UserProject.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'userId',
      })
      UserProject.belongsTo(models.Project, {
        targetKey: 'id',
        foreignKey: 'projectId',
      })
    }
  }
  UserProject.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserProject',
    },
  )
  return UserProject
}
