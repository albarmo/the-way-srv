'use strict'
const { Model } = require('sequelize')
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Project, {
        through: models.UserProject,
        foreignKey: 'userId',
      })
      User.hasMany(models.UserProject, {
        sourceKey: 'id',
        foreignKey: 'userId',
      })
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.password = hashPassword(instance.password)
        },
      },
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
