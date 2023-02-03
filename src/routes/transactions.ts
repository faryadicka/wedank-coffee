const RouterOrder = require("express").Router();
const { createTransactionController: orderController } = require('../controllers/transactions')
const { verifyToken: tokenOrder } = require('../middlewares/verify')


RouterOrder
  .post('/', tokenOrder, orderController)

module.exports = RouterOrder