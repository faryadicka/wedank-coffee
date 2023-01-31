const RouterProducts = require("express").Router();
const { createProductsController: createControl, getAllProductsController: getAllControl } = require('../controllers/products')
const { uploadProducts } = require('../middlewares/upload')

RouterProducts
  .get('/', getAllControl)
  .post('/insert-product', uploadProducts, createControl)

module.exports = RouterProducts;
