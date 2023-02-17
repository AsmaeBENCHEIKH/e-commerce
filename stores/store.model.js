const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    products: { type: DataTypes.JSON, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    onBreak: { type: DataTypes.BOOLEAN, allowNull: false },
    openTime: { type: DataTypes.STRING, allowNull: false },
    closeTime: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("Store", attributes, {});
}
