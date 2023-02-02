const dbTransaction = require("../configs/database");
const { v4: uuidTransaction } = require("uuid");

const createTransactionModel = (product_id: any, user_id: any, coupon_id: any, payment_method_id: any, address: any, phone_number: any, response_midtrans: any, status: any) => {
  return new Promise((resolve: any, reject: any) => {
    const id = uuidTransaction()
    dbTransaction.query("INSERT INTO transaction (id, product_id, user_id, coupon_id, payment_method_id, address, phone_number, response_midtrans, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())", [id, product_id, user_id, coupon_id, payment_method_id, address, phone_number, response_midtrans, status], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = { createTransactionModel }