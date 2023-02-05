import { onFailed, onSuccess } from "../helpers/response"
const { getAllTransactionByUserModel, softDeleteTransactionModel, updateStatusTransactionModel, createTransactionModel, updateResponseMidtransModel } = require('../models/transactions')
const { chargerMidtrans, notificationMidtrans } = require("../helpers/coreApiMidtrans")
const { v4: uuidTransaction } = require("uuid");
const { generateOTP } = require('../helpers/otpGenerator')

const createTransactionController = async (req: any, res: any) => {
  try {
    const id = generateOTP()
    const { id: userId } = req.userInfo
    const { size, paymentMethodType, total, name, address, phoneNumber, bankName, countryId, acquirer, productId, couponId, status, cardNumber, cardExpMonth, cardExpYear, cardCvv } = req.body
    if (paymentMethodType !== 'cod') {
      const responseMidtrans = await chargerMidtrans(paymentMethodType, id, total, name, address, phoneNumber, bankName, countryId, acquirer, cardNumber, cardExpMonth, cardExpYear, cardCvv)
      const response = await createTransactionModel(id, productId, userId, couponId, paymentMethodType, address, phoneNumber, JSON.stringify(responseMidtrans), status, total, size)
      return onSuccess(res, 200, 'Payment Successfuly, please complete step for finish your order!', response.rows[0])
    }
    const response = await createTransactionModel(id, productId, userId, couponId, paymentMethodType, address, phoneNumber, 'NULL', status, total)
    onSuccess(res, 200, 'Payment Successfuly, please complete step for finish your order!', response)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const notificationMidtransController = async (req: any, res: any) => {
  try {
    const responseNotif = await notificationMidtrans(req.body)
    console.log(responseNotif.order_id)
    const response = await updateResponseMidtransModel(JSON.stringify(responseNotif), responseNotif.order_id)
    onSuccess(res, 200, 'Success', response.rows[0])
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const updateStatusTransactionController = async (req: any, res: any) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const response = await updateStatusTransactionModel(status, id)
    onSuccess(res, 200, 'Update status successfully', response.rows[0])
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const softDeleteTransactionController = async (req: any, res: any) => {
  try {
    const { id } = req.body
    // console.log(id)
    const response = await softDeleteTransactionModel(id)
    onSuccess(res, 200, 'Soft delete data successfully', response.rows)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const getAllTransactionByUserController = async (req: any, res: any) => {
  try {
    const { id } = req.userInfo
    const response = await getAllTransactionByUserModel(id)
    onSuccess(res, 200, 'Get All Transaction Successfully', response.rows)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

module.exports = { getAllTransactionByUserController, softDeleteTransactionController, createTransactionController, notificationMidtransController, updateStatusTransactionController }