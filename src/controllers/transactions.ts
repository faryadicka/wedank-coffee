import { onFailed, onSuccess } from "../helpers/response"
const { createTransactionModel: createModel, updateResponseMidtransModel: updateMidtransModel } = require('../models/transactions')
const { getUserByIdModel } = require('../models/user')
const { chargerMidtrans, notificationMidtrans } = require("../helpers/chargerMidtrans")
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
    const { id } = req.userInfo
    const user = await getUserByIdModel(id)
    const { midtrans_response } = user.rows[0]
    const parseResponse = JSON.parse(midtrans_response)
    const responseNotif = await notificationMidtrans(req.body)
    const response = await updateMidtransModel(JSON.stringify(responseNotif), parseResponse.order_id)
    onSuccess(res, 200, 'Success', JSON.parse(response.rows[0]))
  } catch (error: any) {
    onFailed(res, 500, 'InternatServer Error', error.message)
  }
}

module.exports = { createTransactionController, notificationMidtransController }