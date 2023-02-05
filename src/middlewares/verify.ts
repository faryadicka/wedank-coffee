const { onFailed: fail, onSuccess: success } = require("../helpers/response")
const jwtVerify = require('jsonwebtoken')


const verifyToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return fail(res, 500, 'Invalid token')
  await jwtVerify.verify(token, process.env.PRIVATE_KEY, (err: any, decode: any) => {
    if (err) { return fail(res, 500, err) }
    const { id, email, role, otp } = decode
    req.userInfo = { id, email, role, otp }
    next()
  })
}

module.exports = { verifyToken }