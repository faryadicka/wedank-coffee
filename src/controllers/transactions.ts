import { onFailed, onSuccess } from "../helpers/response"
const { createTransactionModel: createModel, updateResponseMidtransModel: updateMidtransModel } = require('../models/transactions')
const { chargerMidtrans, notificationMidtrans } = require("../helpers/coreApiMidtrans")
const { v4: uuidTransaction } = require("uuid");

const createTransactionController = async (req: any, res: any) => {
  try {
    const id = uuidTransaction()
    const { paymentMethodType, total, name, address, phoneNumber, bankName, countryId, acquirer, productId, userId, couponId, status, cardNumber, cardExpMonth, cardExpYear, cardCvv } = req.body
    if (paymentMethodType !== 'cod') {
      const responseMidtrans = await chargerMidtrans(paymentMethodType, id, total, name, address, phoneNumber, bankName, countryId, acquirer, cardNumber, cardExpMonth, cardExpYear, cardCvv)
      const response = await createModel(id, productId, userId, couponId, paymentMethodType, address, phoneNumber, JSON.stringify(responseMidtrans), status, total)
      return onSuccess(res, 200, 'Payment Successfuly, please complete step for finish your order!', response.rows[0])
    }
    const response = await createModel(id, productId, userId, couponId, paymentMethodType, address, phoneNumber, 'NULL', status, total)
    onSuccess(res, 200, 'Payment Successfuly, please complete step for finish your order!', response)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const notificationMidtransController = async (req: any, res: any) => {
  try {
    const responseNotif = await notificationMidtrans(req.body)
    console.log(responseNotif.order_id)
    const response = await updateMidtransModel(JSON.stringify(responseNotif), responseNotif.order_id)
    onSuccess(res, 200, 'Success', response.rows[0])
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error)
  }
}

const updateStatusTransactionCtontroller = async () => {
  try {

  } catch (error: any) {

  }
}


module.exports = { createTransactionController, notificationMidtransController }