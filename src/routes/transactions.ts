const RouterOrder = require("express").Router();
const { getAllTransactionByUserController, softDeleteTransactionController, createTransactionController, notificationMidtransController, updateStatusTransactionController } = require('../controllers/transactions')
const { verifyToken: tokenOrder } = require('../middlewares/verify')


RouterOrder
  .get('/user', tokenOrder, getAllTransactionByUserController)
  .post('/', tokenOrder, createTransactionController)
  .post('/notification', notificationMidtransController) // attach this route to dashboard midtrans to get notifications.
  .patch('/status/:id', tokenOrder, updateStatusTransactionController)
  .patch('/soft-delete', tokenOrder, softDeleteTransactionController)
module.exports = RouterOrder