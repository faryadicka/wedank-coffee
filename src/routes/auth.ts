const RouterAuth = require("express").Router();
const { createUserBySuperAdminController: createUserControl, logoutController: logoutControl, forgotPassController: forgotControl, resetPassController: resetControl, registerUserController: registerControl, verifyAccountController: verifyControl, loginUserController: loginControl } = require('../controllers/auth')
const { inputCreateUserValidate: createUserValidate, inputLoginValidate: loginValidate, inputRegisterValidate: registerValidate, inputResetValidate: resetValidate } = require('../middlewares/authValidate')
const { verifyToken: tokenAdmin, verifyRole } = require('../middlewares/verify')

RouterAuth
  .post('/register', registerValidate, registerControl)
  .post('/create-user', tokenAdmin, createUserValidate, verifyRole, createUserControl)
  .post('/login', loginValidate, loginControl)
  .post('/reset', resetValidate, resetControl)
  .patch('/forgot/:secret', forgotControl)
  .get('/verify/:otp', verifyControl)
  .delete('/logout', logoutControl)


module.exports = RouterAuth
