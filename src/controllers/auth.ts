const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { onFailed, onSuccess } = require("../helpers/response")
const { registerUserModel: registerModel, verifyAccountModel: verifyAccount, loginUserModel: loginUser } = require('../models/auth')
const { checkDuplicate: checkEmail, checkOTP: checkOTPCode } = require('../middlewares/validate')
const { sendEmailVerification: sendEmail, sendEmailLink: sendLink } = require('../configs/nodemailer')
const { generateOTP: otp } = require('../helpers/otpGenerator')
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

const loginUserController = async (req: any, res: any) => {
  try {
    const { email, password } = req.body
    const data = await loginUser(email)
    if (data.rowCount > 0) {
      const result = data.rows[0]
      const hashedPass = result.password
      const match = await bcrypt.compare(password, hashedPass)
      const payload = {
        id: result.id,
        role: result.role_id,
        email: result.email,
        otp: result.otp_code
      }
      if (match) {
        jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '24h' }, (err: any, token: any) => {
          if (err) {
            onFailed(res, 500, err)
          }
          onSuccess(res, 200, 'Login Successfully', { token })
        })
      } else {
        onFailed(res, 403, 'Password is wrong!!')
      }
    } else {
      onFailed(res, 403, 'Email is wrong!!!')
    }
  } catch (error: any) {
    onFailed(res, 500, error.message, error)
  }
}

const resetPassController = async (req: any, res: any) => {
  try {
    const { email } = req.body
    const data = await loginUser(email)
    if (data.rowCount > 0) {
      const result = data.rows[0]
      await sendLink(result.id, result.otp_code, result.email)
      onSuccess(res, 200, 'Please check your email to next step!')
    } else {
      onFailed(res, 403, 'Email isn`t registered!!!')
    }
  } catch (error: any) {
    onFailed(res, 500, error.message, error)
  }
}

const forgotPassController = async (req: any, res: any) => {
  try {
    const { email, newPassword } = req.body
  } catch (error: any) {
    onFailed(res, 500, error.message, error)
  }
}

module.exports = { registerUserController, verifyAccountController, loginUserController, resetPassController }