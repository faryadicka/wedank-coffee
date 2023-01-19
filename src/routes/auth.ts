const RouterApp = require("express").Router();
const { resetPassController: resetPass, registerUserController: registerControl, verifyAccountController: verifyControl, loginUserController: loginControl } = require('../controllers/auth')
const { verifyToken: authToken } = require('../middlewares/verifyToken')

RouterApp
  .post('/register', registerControl)
  .post('/login', loginControl)
  .post('/reset', resetPass)
  .get('/verify/:otp', verifyControl)


module.exports = RouterApp;
