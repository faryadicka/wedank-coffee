const dbTransaction = require("../configs/database");

const createTransactionModel = (id: any, product_id: any, user_id: any, coupon_id: any, payment_method_type: any, address: any, phone_number: any, response_midtrans: any, status: any, total: any) => {
  return new Promise((resolve: any, reject: any) => {
    // const id = uuidTransaction()
    dbTransaction.query("INSERT INTO transactions (id, product_id, user_id, coupon_id, payment_method_type, address, phone_number, midtrans_response, status, total, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now()) RETURNING *", [id, product_id, user_id, coupon_id, payment_method_type, address, phone_number, response_midtrans, status, total], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const updateResponseMidtransModel = (midtransResponse: string, id: string) => {
  return new Promise((resolve: any, reject: any) => {
    dbTransaction.query("UPDATE transactions SET midtrans_response = $1 WHERE id = $2 RETURNING midtrans_response", [midtransResponse, id], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = { createTransactionModel, updateResponseMidtransModel }