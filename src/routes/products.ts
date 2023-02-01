const RouterProducts = require("express").Router();
const { createProductsController: createControl, getAllProductsController: getAllControl, updateProductController: updateProductControl } = require('../controllers/products')
const { uploadProducts } = require('../middlewares/upload')
const { verifyToken: tokenProducts } = require('../middlewares/verify')


RouterProducts
  .get('/', getAllControl)
  .post('/insert-product', uploadProducts, createControl)
  .patch('/:id', tokenProducts, updateProductControl)

module.exports = RouterProducts;
