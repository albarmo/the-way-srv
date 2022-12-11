'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vendor.init(
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      geolocation: DataTypes.STRING,
      package: DataTypes.STRING,
      phone: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Vendor',
    },
  )
  return Vendor
}
