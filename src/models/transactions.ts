const dbTransaction = require("../configs/database");

const createTransactionModel = (id: string, product_id: string, user_id: string, coupon_id: string, payment_method_type: string, address: string, phone_number: string, response_midtrans: string, status: string, total: string) => {
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

const updateStatusTransactionModel = (status: string, id: string) => {
  return new Promise((resolve: any, reject: any) => {
    dbTransaction.query("UPDATE transactions SET status = $1 WHERE id = $2 RETURNING *", [status, id], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const softDeleteTransactionModel = (id: string) => {
  return new Promise((resolve: any, reject: any) => {
    const SQL = "UPDATE transactions SET status = 'deleted' WHERE id IN (" + id + ") RETURNING *"
    // console.log(SQL)
    dbTransaction.query(SQL, (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const getAllTransactionByUserModel = (id: any) => {
  return new Promise((resolve: any, reject: any) => {
    const SQL = "SELECT * FROM transactions WHERE user_id LIKE $1"
    dbTransaction.query(SQL, [id], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = { getAllTransactionByUserModel, createTransactionModel, updateResponseMidtransModel, updateStatusTransactionModel, softDeleteTransactionModel }