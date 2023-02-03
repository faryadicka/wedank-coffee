import { onFailed, onSuccess } from "../helpers/response"
const { createTransactionModel: createModel } = require('../models/transactions')
const { chargerMidtrans } = require("../helpers/chargerMidtrans")
const { v4: uuidTransaction } = require("uuid");

const createTransactionController = async (req: any, res: any) => {
  try {
    const id = uuidTransaction()
    const { paymentMethodType, total, name, address, phoneNumber, bankName, countryId, acquirer, productId, userId, couponId, status, cardNumber, cardExpMonth, cardExpYear, cardCvv } = req.body
    if (paymentMethodType !== 'cod') {
      const responseMidtrans = await chargerMidtrans(paymentMethodType, id, total, name, address, phoneNumber, bankName, countryId, acquirer, cardNumber, cardExpMonth, cardExpYear, cardCvv)
      const response = await createModel(id, productId, userId, couponId, paymentMethodType, address, phoneNumber, JSON.stringify(responseMidtrans), status, total)
      return onSuccess(res, 200, 'Payment Successfuly, please complete step for finish your order!', response)
    }
    const response = await createModel(id, productId, userId, couponId, paymentMethodType, address, phoneNumber, 'NULL', status, total)
    onSuccess(res, 200, 'Payment Successfuly, please complete step for finish your order!', response)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

module.exports = { createTransactionController }