const nodemailer = require('nodemailer')
const { USER_TRANSPORTER, PASS_TRANSPORTER, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: USER_TRANSPORTER,
    pass: PASS_TRANSPORTER,
    clientId: OAUTH_CLIENTID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
  }
})

const sendEmailVerification = (email: string, otpCode: string) => {
  const mailOptions = {
    from: USER_TRANSPORTER,
    to: email,
    subject: 'Email for Verification Register',
    text: `Your email : ${email} 
    click this link for next step wedankcoffee.com/auth/verify/${otpCode}`
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.log(err.message)
      return err
    } else {
      console.log('Email sent: ' + info)
      return info
    }
  })
}

const sendEmailLink = (id: string, otp: any, email: string) => {
  const encodeUrl = btoa(`${id}#-&${otp}`)
  const mailOptions = {
    from: USER_TRANSPORTER,
    to: email,
    subject: 'Link for Reset Password',
    text: `Your email : ${email} 
    click this link for next step wedankcoffee.com/auth/reset/${encodeUrl}`
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.log(err)
      return err
    } else {
      console.log('Email sent: ' + info)
      return info
    }
  })
}

module.exports = { sendEmailVerification, sendEmailLink }