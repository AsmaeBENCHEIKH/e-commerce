const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("middleware/validate-request");
const storeService = require("./store.service");

// routes

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/products", getProductsById);
router.get("/:id/products/categories", getProductsCategoriesById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  storeService
    .getAll()
    .then((stores) => res.json(stores))
    .catch(next);
}

function getById(req, res, next) {
  storeService
    .getById(req.params.id)
    .then((store) => res.json(store))
    .catch(next);
}
function getProductsById(req, res, next) {
  storeService
    .getById(req.params.id)
    .then((store) => res.json(store.products))
    .catch(next);
}
function getProductsCategoriesById(req, res, next) {
  storeService
    .getById(req.params.id)
    .then((store) => {
      let categories = [];
      store.products?.forEach((product) => {
        product.Categories?.forEach((cat) => {
          categories.push(cat);
        });
      });
      const arrUniq = [
        ...new Map(categories.map((cat) => [cat.id, cat])).values(),
      ];
      res.json(arrUniq);
    })
    .catch(next);
}
function create(req, res, next) {
  storeService
    .create(req.body)
    .then(() => res.json({ message: "Store created" }))
    .catch(next);
}

function update(req, res, next) {
  console.log(req);
  storeService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Store updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  storeService
    .delete(req.params.id)
    .then(() => res.json({ message: "Store deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    products: Joi.array().allow(null),
    description: Joi.string().allow(null, ""),
    onBreak: Joi.boolean().required(),
    openTime: Joi.string().required(),
    closeTime: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    products: Joi.array().allow(null),
    description: Joi.string().allow(null, ""),
    onBreak: Joi.boolean().required(),
    openTime: Joi.string().required(),
    closeTime: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}
