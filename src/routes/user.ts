const RouterUser = require("express").Router();
const { updateUserController: updateControl, changePasswordController: changePassControl, getUserController: getUserControl } = require('../controllers/user')
const { verifyToken: token } = require('../middlewares/verify')
const { uploadProfile } = require('../middlewares/upload')

RouterUser
  .get('/profile', token, getUserControl)
  .patch('/profile', token, uploadProfile, updateControl)
  .patch('/profile/change-pass', token, changePassControl)

module.exports = RouterUser
