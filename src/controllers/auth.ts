const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { onFailed, onSuccess } = require("../helpers/response")
const { registerUserModel: registerModel, verifyAccountModel: verifyAccount, loginUserModel: loginUser, forgotPassModel: forgotPass } = require('../models/auth')
const { checkDuplicate: checkEmail, checkOTP: checkOTPCode } = require('../middlewares/validate')
const { sendEmailVerification: sendEmail, sendEmailLink: sendLink } = require('../configs/nodemailer')
const { generateOTP: otp } = require('../helpers/otpGenerator')
const clientValue = require('../configs/redis')
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
      clientValue.set('userId', result.id)
      if (match) {
        const tokenResult = jwt.sign(payload, process.env.PRIVATE_KEY, { exiresIn: '24h' })
        const userId = await clientValue.get('userId')
        clientValue.set(`userToken-${userId}`, tokenResult)
        const token = await clientValue.get(`userToken-${userId}`)
        onSuccess(res, 200, 'Login successfully', { token })
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
      clientValue.set('email', result.email)
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
    const { newPassword } = req.body
    const { secret } = req.params
    const encodeUrl = atob(secret)
    const splitUrl = encodeUrl.split('#-&')
    const email = await clientValue.get('email')
    const pass = await bcrypt.hash(newPassword, 10)
    const result = await forgotPass(email, pass, splitUrl[0], splitUrl[1])
    if (result.rowCount === 1) {
      return onSuccess(res, 200, 'Reset password successfuly')
    }
    onFailed(res, 400, 'Error code, better repeat the previous step')
  } catch (error: any) {
    onFailed(res, 500, error.message, error)
  }
}

const logoutController = async (req: any, res: any) => {
  try {
    const userId = await clientValue.get('userId')
    clientValue.del(`userToken-${userId}`)
    const token = await clientValue.get(`userToken-${userId}`)
    onSuccess(res, 500, 'Logout Successfuly', { token })
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error)
  }
}

module.exports = { registerUserController, verifyAccountController, loginUserController, resetPassController, forgotPassController }