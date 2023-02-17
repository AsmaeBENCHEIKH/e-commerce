const db = require("tools/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Category.findAll({ include: db.Product });
}

async function getById(id) {
  return await Category(id);
}

async function create(params) {
  // validate
  if (
    await db.Category.findOne({
      where: { name: params.name },
      include: db.Product,
    })
  ) {
    throw (
      'Name "' + params.name + '" already exists, choose another name please.'
    );
  }
  const productsIds = params.products.map(({ id }) => id);
  const category = new db.Category(params);
  await category.save();
  await category.setProducts(productsIds);
}

async function update(id, params) {
  const category = await getCategory(id);

  // validate
  const categoryNameChanged = params.name && category.name !== params.name;
  if (
    categoryNameChanged &&
    (await db.Category.findOne({ where: { name: params.name } }))
  ) {
    throw 'Category name: "' + params.username + '" is already taken';
  }
  const productsIds = params.products.map(({ id }) => id);
  Object.assign(category, params);
  await category.save();
  await category.setProducts(productsIds);
}

async function _delete(id) {
  const category = await getCategory(id);
  await category.destroy();
}

// helper functions

async function getCategory(id) {
  const category = await db.Category.findByPk(id);
  if (!category) throw "Category not found";
  return category;
}
