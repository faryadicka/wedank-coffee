const { upload: uploadAva } = require('../middlewares/upload')

const uploadAvatar = (req: any, res: any, next: any) => {
  uploadAva(req, res, function (err: any) {
    if (err) {
      return res.status(400).send({ message: err.message })
    }
  })
  next()
}

module.exports = { uploadAvatar }