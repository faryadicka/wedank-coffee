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
    subject: 'Email Verification Ragister',
    text: `Your email : ${email} 
    click this link for next step http://localhost:8000/auth/verify/${otpCode}`
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

module.exports = { sendEmailVerification }