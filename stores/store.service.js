const db = require("tools/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Store.findAll();
}

async function getById(id) {
  return await getStore(id);
}

async function create(params) {
  // validate
  if (await db.Store.findOne({ where: { name: params.name } })) {
    throw (
      'Name "' + params.name + '" already exists, choose another name please.'
    );
  }

  const store = new db.Store(params);
  await store.save();
}

async function update(id, params) {
  const store = await getStore(id);

  // validate
  const storeNameChanged = params.name && store.name !== params.name;
  if (
    storeNameChanged &&
    (await db.Store.findOne({ where: { name: params.name } }))
  ) {
    throw 'Store name: "' + params.username + '" is already taken';
  }
  Object.assign(store, params);
  await store.save();
}

async function _delete(id) {
  const store = await getStore(id);
  await store.destroy();
}

// helper functions

async function getStore(id) {
  const store = await db.Store.findByPk(id);
  if (!store) throw "Store not found";
  return store;
}
