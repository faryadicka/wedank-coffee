const dbUser = require("../configs/database");

const getAllUserModel = () => {
  return new Promise((resolve: any, reject: any) => {
    dbUser.query("SELECT id, email, phone_number, address, gender, birthdate, image_profile, last_name, first_name, status FROM users", (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const updateUserModel = (phoneNumber: any, address: any, gender: any, firstName: any, lastName: any, email: any, birthdate: any, image: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbUser.query("UPDATE users SET phone_number=COALESCE($1, phone_number), address=COALESCE($2, address), gender=COALESCE($3, gender), first_name=COALESCE($4, first_name), last_name=COALESCE($5, last_name), birthdate=COALESCE($6, birthdate), image_profile=COALESCE($7, image_profile) WHERE email LIKE $8", [phoneNumber, address, gender, firstName, lastName, birthdate, image, email], (err: any, res: any) => {
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

const getUserByIdModel = (id: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbUser.query("SELECT u.id, u.email, t.midtrans_response FROM transactions t LEFT JOIN users u ON t.user_id = u.id where u.id = $1", [id], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = { getAllUserModel, updateUserModel, changePasswordModel, getUserByIdModel }