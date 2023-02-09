const RouteCoupon = require('express').Router()
const { createCouponController, getAllCouponsController, applyCouponController } = require('../controllers/coupons')
const { verifyToken } = require('../middlewares/verify')

RouteCoupon
  .get('/', getAllCouponsController)
  .post('/', createCouponController)
  // .patch('/apply-coupon/:id', verifyToken, applyCouponController)

module.exports = RouteCoupon