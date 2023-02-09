import { onSuccess, onFailed } from "../helpers/response"

const { getAllCouponsModel: getAllCoupons, createCouponModel } = require('../models/coupons')

const getAllCouponsController = async (req: any, res: any) => {
  try {
    const response = await getAllCoupons()
    onSuccess(res, 200, 'Get All Coupons Successfully', response.rows)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const createCouponController = async (req: any, res: any) => {
  try {
    const { couponCode, couponDisc, couponDesc, couponImage, couponName, endedAt } = req.body
    const response = await createCouponModel(couponCode, couponDisc, couponDesc, endedAt, couponImage, couponName)
    onSuccess(res, 200, 'Create coupon successfully', response)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}


// const applyCouponController = async (req: any, res: any) => {
//   try {
//     const { id } = req.params
//     const detail = await getCouponByIdModel(id)
//     // const normalPrice = Number(detail.rows[0].price)
//     // const disc = Number(detail.rows[0].coupon_disc) / 100
//     // const result = normalPrice - (normalPrice * disc)
//     // if (detail.rowCount === 1) {
//     //   const response = await applyCouponModel(result, Number(id))
//     //   return onSuccess(res, 200, 'Success apply coupon', response)
//     // }
//     onSuccess(res, 200, 'Success', detail.rows[0])
//   } catch (error: any) {
//     onFailed(res, 500, 'Internal Server Error', error.message)
//   }
// }

module.exports = { getAllCouponsController, createCouponController }
