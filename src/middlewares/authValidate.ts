import { onFailed } from "../helpers/response"

const inputLoginValidate = (req: any, res: any, next: any) => {
  const { email, password } = req.body
  if (!email || !password || email.length === 0 || password.length === 0) {
    return onFailed(res, 403, 'Email or Password can`t be empty!', null)
  }
  if (!email.includes('@')) {
    return onFailed(res, 403, 'Email invalid, please input your email correctly', null)
  }
  next()
}

const inputRegisterValidate = (req: any, res: any, next: any) => {
  const { email, password, phoneNumber, firstName, lastName } = req.body
  if (!email || email.length === 0) {
    return onFailed(res, 403, 'Email field can`t be empty!', null)
  }
  if (!email.includes('@')) {
    return onFailed(res, 403, 'Email invalid, please input your email correctly', null)
  }
  if (!password || password.length === 0) {
    return onFailed(res, 403, 'Password field can`t be empty!', null)
  }
  if (password.length < 8) {
    return onFailed(res, 403, 'Minimum password characters are at least 8 characters', null)
  }
  if (!phoneNumber.includes('08')) {
    return onFailed(res, 403, 'Phone number invalid, please input your phone number correctly', null)
  }
  if (!firstName || firstName.length === 0) {
    return onFailed(res, 403, 'First name field can`t be empty!', null)
  }
  if (!lastName || lastName.length === 0) {
    return onFailed(res, 403, 'Last name field can`t be empty!', null)
  }
  next()
}

const inputResetValidate = (req: any, res: any, next: any) => {
  const { email } = req.body
  if (!email || email.length === 0) {
    return onFailed(res, 403, 'Email field can`t be empty!', null)
  }
  if (!email.includes('@')) {
    return onFailed(res, 403, 'Email invalid, please input your email correctly', null)
  }
  next()
}

module.exports = { inputLoginValidate, inputRegisterValidate, inputResetValidate }