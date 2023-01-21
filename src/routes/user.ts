const RouterUser = require("express").Router();
const { updateUserController: updateControl, changePasswordController: changePassControl } = require('../controllers/user')
const { verifyToken: token } = require('../middlewares/verify')

RouterUser.patch('/profile', token, updateControl)
  .patch('/profile/change-pass', token, changePassControl)

module.exports = RouterUser
