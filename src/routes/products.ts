const RouterProducts = require("express").Router();
const { getDetailProductController: detailControl, createProductsController: createControl, getAllProductsController: getAllControl, updateProductController: updateProductControl } = require('../controllers/products')
const { uploadProducts } = require('../middlewares/upload')
const { verifyToken: tokenProducts } = require('../middlewares/verify')
const { inputCreateProduct } = require('../middlewares/productValidate')

RouterProducts
  .get('/', getAllControl)
  .post('/', tokenProducts, uploadProducts, inputCreateProduct, createControl)
  .patch('/:imagesid', tokenProducts, uploadProducts, inputCreateProduct, updateProductControl)
  .get('/:id', detailControl)

module.exports = RouterProducts;
