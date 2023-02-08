const RouterUser = require("express").Router();
const { getAllusersController, updateUserController: updateControl, changePasswordController: changePassControl, getUserController: getUserControl } = require('../controllers/user')
const { verifyToken: token, verifyRole: checkRole } = require('../middlewares/verify')
const { uploadProfile } = require('../middlewares/upload')

RouterUser
  .get('/', token, checkRole, getAllusersController)
  .get('/profile', token, getUserControl)
  .patch('/profile', token, uploadProfile, updateControl)
  .patch('/profile/change-pass', token, changePassControl)

module.exports = RouterUser
