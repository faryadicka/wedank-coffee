const RouterAuth = require("express").Router();
const { logoutController: logoutControl, forgotPassController: forgotControl, resetPassController: resetControl, registerUserController: registerControl, verifyAccountController: verifyControl, loginUserController: loginControl } = require('../controllers/auth')
const { inputLoginValidate: loginValidate, inputRegisterValidate: registerValidate, inputResetValidate: resetValidate } = require('../middlewares/authValidate')


RouterAuth
  .post('/register', registerValidate, registerControl)
  .post('/login', loginValidate, loginControl)
  .post('/reset', resetValidate, resetControl)
  .patch('/forgot/:secret', forgotControl)
  .get('/verify/:otp', verifyControl)
  .delete('/logout', logoutControl)


module.exports = RouterAuth
