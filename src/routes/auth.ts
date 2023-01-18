const RouterApp = require("express").Router();
const { registerUserController: registerControl, verifyAccountController: verifyControl } = require('../controllers/auth')

RouterApp
  .get('/register', registerControl)
  .get('/verify/:otp', verifyControl)


module.exports = RouterApp;
