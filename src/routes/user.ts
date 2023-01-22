const RouterUser = require("express").Router();
const { updateUserController: updateControl, changePasswordController: changePassControl, getUserController: getUserControl } = require('../controllers/user')
const { verifyToken: token } = require('../middlewares/verify')

RouterUser
  .get('/profile', token, getUserControl)
  .patch('/profile', token, updateControl)
  .patch('/profile/change-pass', token, changePassControl)

module.exports = RouterUser
