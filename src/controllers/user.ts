import { onFailed, onSuccess } from "../helpers/response"
const { updateUserModel: updateModel, changePasswordModel: changePassModel } = require('../models/user')
const { checkPassword, checkDuplicate } = require('../middlewares/validate')
const bcryptUser = require('bcrypt')
const { upload: uploadAva } = require('../middlewares/upload')


const getUserController = async (req: any, res: any) => {
  try {
    const { email } = req.userInfo
    const data = await checkDuplicate(email)
    const result = data.rows[0]
    if (data.rowCount === 1) {
      return onSuccess(res, 200, 'Get user successfully', result)
    }
    onFailed(res, 400, 'User not found', null)
  } catch (error: any) {
    onFailed(res, 500, 'User not found', error.message)
  }
}

const updateUserController = async (req: any, res: any) => {
  try {
    // uploadAva(req, res, function (err: any) {
    //   if (err) {
    //     return onFailed(res, 400, err.message, err)
    //   }
    //   const { email } = req.userInfo
    //   const { file } = req
    //   console.log({ file })
    //   const profile = file ? file.path : null
    //   const { phoneNumber, address, gender, firstName, lastName, birthdate } = req.body
    //   updateModel(phoneNumber, address, gender, firstName, lastName, email, birthdate, profile)
    // })
    const { email } = req.userInfo
    const { file } = req
    // console.log({ file })
    const profile = file ? file.path : null
    const { phoneNumber, address, gender, firstName, lastName, birthdate } = req.body
    // await updateModel(phoneNumber, address, gender, firstName, lastName, email, birthdate, profile)
    console.log({ phoneNumber, address, gender, firstName, lastName, birthdate })
    onSuccess(res, 200, 'Update user successfully')
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
    console.log(error)
  }
}

const changePasswordController = async (req: any, res: any) => {
  try {
    const { currentPassword, newPassword } = req.body
    const { email } = req.userInfo
    const pass = await bcryptUser.hash(newPassword, 10)
    const data = await checkDuplicate(email)
    if (data.rowCount === 0) return onFailed(res, 404, 'User uregistered, please re login!', null)
    const { password: hashedPass } = data.rows[0]
    const match = await checkPassword(currentPassword, hashedPass)
    if (match) {
      await changePassModel(pass, email)
      return onSuccess(res, 200, 'Change password successfuly')
    }
    onFailed(res, 403, 'Current Password is wrong!', null)
  } catch (error: any) {
    onFailed(res, 500, 'Internal server error', error.message)
  }
}

module.exports = { updateUserController, changePasswordController, getUserController }