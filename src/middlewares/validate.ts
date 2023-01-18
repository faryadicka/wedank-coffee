const dbmdw = require('../configs/database')

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

module.exports = { checkDuplicate }