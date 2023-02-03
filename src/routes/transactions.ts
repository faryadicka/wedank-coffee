const RouterOrder = require("express").Router();
const { createTransactionController: orderController, updateResponseMidtransController: updateMidtransControl } = require('../controllers/transactions')
const { verifyToken: tokenOrder } = require('../middlewares/verify')


RouterOrder
  .post('/', tokenOrder, orderController)
  .patch('/:id', tokenOrder, updateMidtransControl)

module.exports = RouterOrder