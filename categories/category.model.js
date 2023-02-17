const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  console.log("models", sequelize.models);
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    //products: { type: DataTypes.JSON, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
  };
  const Category = sequelize.define("Category", attributes, {});
  Category.belongsToMany(sequelize.models.Product, {
    through: "Product-Categories",
  });
  sequelize.models.Product.belongsToMany(Category, {
    through: "Product-Categories",
  });
  return Category;
}
