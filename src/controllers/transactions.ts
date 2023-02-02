import { onFailed } from "../helpers/response"
const { createTransactionModel: createModel } = require('../models/transactions')
const { coreApi: core } = require('../configs/midtrans')
const { v4: uuidTransaction } = require("uuid");

const createTransactionController = async (req: any, res: any) => {
  try {
    const id = uuidTransaction()
    const { bank_name, total, token_id, price, product_id, quantity, product_name } = req.body
    const parameter = {
      "transaction_details": {
        "gross_amount": total,
        "order_id": id,
      },
      "bank_transfer": {
        "bank": bank_name
      },
      "credit_card": {
        "token_id": token_id,
        "bank": bank_name,
        "save_token_id": true
      },
      "item_details": [{
        "id": product_id,
        "price": price,
        "quantity": quantity,
        "name": product_name,
      }]
    };
    const response = await core.charge(parameter)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}