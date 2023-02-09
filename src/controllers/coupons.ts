import { onSuccess, onFailed } from "../helpers/response"

const { getAllCouponsModel: getAllCoupons, applyCouponModel, getCouponByIdModel } = require('../models/coupons')

const getAllCouponsController = async (req: any, res: any) => {
  try {
    const response = await getAllCoupons()
    const result = response.rows.map((item: any) => {
      const imgValues = Object.values(item).filter((i: any) => {
        return String(i).includes('image')
      })
      return { id: item.id, name: item.name, image: imgValues, coupon_code: item.coupon_code, coupon_disc: item.coupon_disc, ended_at: item.ended_at, coupon_desc: item.coupon_desc }
    })
    onSuccess(res, 200, 'Get All Coupons Successfully', result)
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

module.exports = { getAllCouponsController }