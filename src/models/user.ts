const dbUser = require("../configs/database");

const updateUserModel = (phoneNumber: any, address: any, gender: any, firstName: any, lastName: any, email: any, birthdate: any, image: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbUser.query("UPDATE users SET phone_number=COALESCE($1, phone_number), address=COALESCE($2, address), gender=COALESCE($3, gender), first_name=COALESCE($4, first_name), last_name=COALESCE($5, last_name), birthdate=COALESCE($6, birthdate), image_profile=COALESCE($7, image_profile) WHERE email LIKE $8", [phoneNumber, address, gender, firstName, lastName, birthdate, email, image], (err: any, res: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

const changePasswordModel = (password: any, email: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbUser.query("UPDATE users SET password = $1 WHERE email LIKE $2", [password, email], (err: any, res: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

module.exports = { updateUserModel, changePasswordModel }