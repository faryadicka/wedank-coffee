const RouterOrder = require("express").Router();
const { createTransactionController: orderController, updateResponseMidtransController: updateMidtransControl } = require('../controllers/transactions')
const { verifyToken: tokenOrder } = require('../middlewares/verify')


RouterOrder
  .post('/', tokenOrder, orderController)
  .post('/notification', tokenOrder, updateMidtransControl) // attach this route to dashboard midtrans to get notifications.

module.exports = RouterOrder