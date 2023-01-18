const { onFailed, onSuccess } = require("../helpers/response")
const { registerUserModel: registerModel, verifyAccountModel: verifyAccount } = require('../models/auth')
const { checkDuplicate: checkEmail, checkOTP: checkOTPCode } = require('../middlewares/validate')
const { sendEmailVerification: sendEmail } = require('../configs/nodemailer')
const { generateOTP: otp } = require('../helpers/otpGenerator')
const bcrypt = require('bcrypt')
var otp_code = otp()

const registerUserController = async (req: any, res: any) => {
  try {
    const { email, password, phoneNumber, firstName, lastName } = req.body
    const pass = await bcrypt.hash(password, 10)
    const check = await checkEmail(email)
    if (check.rowCount > 0) {
      return onFailed(res, 409, 'Email already exist, please input another email')
    }
    await registerModel(email, pass, phoneNumber, firstName, lastName, otp_code)
    await sendEmail(email, otp_code)
    onSuccess(res, 200, 'Register Successfully, please check your email to verify your account!')
  } catch (error: any) {
    console.log(error)
    onFailed(res, 500, 'Internal Server Error', error)
  }
}

const verifyAccountController = async (req: any, res: any) => {
  try {
    const { otp } = req.params;
    const checkOTP = await checkOTPCode(otp)
    if (checkOTP.rowCount === 1) {
      await verifyAccount(otp)
      onSuccess(res, 200, 'Your account has been verified')
    }
    onFailed(res, 404, "OTP isn't match")
  } catch (error: any) {
    console.log(error)
    onFailed(res, 500, error)
  }
}

module.exports = { registerUserController, verifyAccountController }