const RouterProducts = require("express").Router();
const { getDetailProductController: detailControl, createProductsController: createControl, getAllProductsController: getAllControl, updateProductController: updateProductControl } = require('../controllers/products')
const { uploadProducts } = require('../middlewares/upload')
const { verifyToken: tokenProducts } = require('../middlewares/verify')


RouterProducts
  .get('/', getAllControl)
  .post('/', tokenProducts, uploadProducts, createControl)
  .patch('/:imagesid', tokenProducts, uploadProducts, updateProductControl)
  .get('/:id', detailControl)

module.exports = RouterProducts;
