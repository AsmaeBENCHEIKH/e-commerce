const db = require("tools/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Product.findAll({ include: db.Category });
}

async function getById(id) {
  return await getProduct(id);
}

async function create(params) {
  console.log("paarams", params);
  console.log("CATTTT", params.Categories);
  // validate
  if (
    await db.Product.findOne({
      where: { name: params.name },
      include: db.Category,
    })
  ) {
    throw (
      'Name "' + params.name + '" already exists, choose another name please.'
    );
  }
  const categoriesIds = params.Categories.map(({ id }) => id);
  const product = new db.Product(params);
  await product.save();
  await product.setCategories(categoriesIds);
}

async function update(id, params) {
  const product = await getProduct(id);

  // validate
  const productNameChanged = params.name && product.name !== params.name;
  if (
    productNameChanged &&
    (await db.Product.findOne({ where: { name: params.name } }))
  ) {
    throw 'Product name: "' + params.name + '" is already taken';
  }
  const categoriesIds = params.Categories.map(({ id }) => id);
  Object.assign(product, params);
  await product.save();
  await product.setCategories(categoriesIds);
}

async function _delete(id) {
  const product = await getProduct(id);
  await product.destroy();
}

// helper functions

async function getProduct(id) {
  const product = await db.Product.findByPk(id);
  if (!product) throw "Product not found";
  return product;
}
