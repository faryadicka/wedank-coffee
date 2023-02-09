const dbCoupon = require('../configs/database')

const getAllCouponsModel = () => {
  return new Promise((resolve: any, reject: any) => {
    dbCoupon.query('SELECT c.id, p.name, pi2.image1, c.coupon_code, c.coupon_disc, c.coupon_desc, c.ended_at FROM coupons c LEFT JOIN products p on c.id = p.coupon_id LEFT JOIN product_images pi2 ON p.images_id = pi2.id', (err: any, res: any) => {
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

module.exports = { getAllCouponsModel }