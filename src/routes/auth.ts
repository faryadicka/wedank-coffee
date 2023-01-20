const RouterApp = require("express").Router();
const { forgotPassController: forgotControl, resetPassController: resetControl, registerUserController: registerControl, verifyAccountController: verifyControl, loginUserController: loginControl } = require('../controllers/auth')
const { verifyToken: authToken } = require('../middlewares/verifyToken')

RouterApp
  .post('/register', registerControl)
  .post('/login', loginControl)
  .post('/reset', resetControl)
  .patch('/forgot/:secret', forgotControl)
  .get('/verify/:otp', verifyControl)


module.exports = RouterApp
