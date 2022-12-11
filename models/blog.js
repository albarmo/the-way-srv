'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      // define association here
    }
  }
  Blog.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      author: DataTypes.STRING,
      tag: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Blog',
    },
  )
  return Blog
}
