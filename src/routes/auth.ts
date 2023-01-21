const RouterAuth = require("express").Router();
const { logoutController: logoutControl, forgotPassController: forgotControl, resetPassController: resetControl, registerUserController: registerControl, verifyAccountController: verifyControl, loginUserController: loginControl } = require('../controllers/auth')

RouterAuth
  .post('/register', registerControl)
  .post('/login', loginControl)
  .post('/reset', resetControl)
  .patch('/forgot/:secret', forgotControl)
  .get('/verify/:otp', verifyControl)
  .delete('/logout', logoutControl)


module.exports = RouterAuth
