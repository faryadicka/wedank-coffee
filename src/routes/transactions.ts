const RouterOrder = require("express").Router();
const { createTransactionController: orderController, notificationMidtransController } = require('../controllers/transactions')
const { verifyToken: tokenOrder } = require('../middlewares/verify')


RouterOrder
  .post('/', tokenOrder, orderController)
  .post('/notification', tokenOrder, notificationMidtransController) // attach this route to dashboard midtrans to get notifications.

module.exports = RouterOrder