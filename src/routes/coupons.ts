const RouteCoupon = require('express').Router()
const { getAllCouponsController, applyCouponController } = require('../controllers/coupons')
const { verifyToken } = require('../middlewares/verify')

RouteCoupon
  .get('/', getAllCouponsController)
  // .patch('/apply-coupon/:id', verifyToken, applyCouponController)

module.exports = RouteCoupon