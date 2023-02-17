const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    engName: { type: DataTypes.STRING, allowNull: false },
    //categories: { type: DataTypes.JSON, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    engDescription: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.INTEGER, allowNull: false },
  };

  return sequelize.define("Product", attributes, {});
}
