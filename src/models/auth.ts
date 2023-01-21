const dbAuth = require("../configs/database");
const { v4: uuidv4 } = require("uuid");

const registerUserModel = (
  email: string,
  password: string,
  phoneNumber: string,
  firstName: string,
  lastName: string,
  otpCode: any
) => {
  return new Promise((resolve: any, reject: any) => {
    const id = uuidv4();
    dbAuth.query(
      "INSERT INTO users(id, email, password, phone_number, first_name, last_name, otp_code) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, email, password, phoneNumber, firstName, lastName, otpCode],
      (err: any, res: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      }
    );
  })
};

const verifyAccountModel = (otp: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbAuth.query("UPDATE users SET status = 'active' WHERE otp_code LIKE $1", [otp], (err: any, res: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

const loginUserModel = (email: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbAuth.query('SELECT * FROM users WHERE email LIKE $1', [email], (err: any, res: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

const forgotPassModel = (email: any, newPassword: any, id: string, otp: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbAuth.query("UPDATE users SET password = $1 WHERE email LIKE $2 AND id LIKE $3 AND otp_code LIKE $4", [newPassword, email, id, otp], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = { registerUserModel, verifyAccountModel, loginUserModel, forgotPassModel };
