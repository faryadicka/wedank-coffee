const dbCoupon = require('../configs/database')
const codeGenerator = require('../helpers/codeGenerator')

const getAllCouponsModel = () => {
  return new Promise((resolve: any, reject: any) => {
    dbCoupon.query('SELECT p.id, c.coupon_name, coupon_image, c.id as coupon_id, c.coupon_code, c.coupon_disc, c.coupon_desc, c.ended_at FROM coupons c LEFT JOIN products p on c.id = p.coupon_id', (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const createCouponModel = (couponCode: any, couponDisc: any, couponDesc: any, endedAt: any, couponImage: any, couponName: any) => {
  return new Promise((resolve: any, reject: any) => {
    const id = codeGenerator()
    dbCoupon.query("INSERT INTO coupons (id, coupon_code, coupon_disc, coupon_desc, ended_at, coupon_image, coupon_name, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, now())", [id, couponCode, couponDisc, couponDesc, endedAt, couponImage, couponName], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

// const getCouponByIdModel = (id: string) => {
//   return new Promise((resolve: any, reject: any) => {
//     dbCoupon.query("SELECT p.id, c.id as coupon_id, p.name, p.price, pi2.image1, c.coupon_code, c.coupon_disc, c.coupon_desc, c.ended_at FROM coupons c LEFT JOIN products p on c.id = p.coupon_id LEFT JOIN product_images pi2 ON p.images_id = pi2.id WHERE c.id = $1", [id], (err: any, res: any) => {
//       if (err) return reject(err)
//       return resolve(res)
//     })
//   })
// }

// const applyCouponModel = (price: any, id: string) => {
//   return new Promise((resolve: any, reject: any) => {
//     dbCoupon.query("UPDATE products SET price = $1 WHERE id = $2 RETURNING *", [price, id], (err: any, res: any) => {
//       if (err) return reject(err)
//       return resolve(res)
//     })
//   })
// }

module.exports = { getAllCouponsModel, createCouponModel }
