const dbmdw = require('../configs/database')
const bcryptVerify = require('bcrypt')


const checkDuplicate = (email: string) => {
  return new Promise((resolve: any, reject: any) => {
    dbmdw.query('SELECT * FROM users WHERE email LIKE $1', [email], (err: any, res: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

const checkOTP = (otpCode: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbmdw.query('SELECT * FROM users WHERE otp_code LIKE $1', [otpCode], (err: any, res: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

const checkPassword = async (password: any, hashedPass: any) => {
  return await bcryptVerify.compare(password, hashedPass)
}
module.exports = { checkDuplicate, checkOTP, checkPassword }