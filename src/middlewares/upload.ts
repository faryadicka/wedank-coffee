const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.join(__dirname, "/uploads"))
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  }
})

const upload = multer({ storage }).single('avatar')

module.exports = { upload }

