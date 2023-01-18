const RouterApp = require("express").Router();
const { registerUserController: registerControl } = require('../controllers/auth')

RouterApp.get('/register', registerControl)

module.exports = RouterApp;
