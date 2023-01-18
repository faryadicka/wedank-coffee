const dbpg = require("../configs/database");
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
    dbpg.query(
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
    dbpg.query("UPDATE users SET status = 'active' WHERE otp_code LIKE $1", [otp], (err: any, res: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

module.exports = { registerUserModel, verifyAccountModel };
