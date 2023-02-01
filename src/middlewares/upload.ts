import { onFailed } from "../helpers/response";
const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file: any) => {
    const parse = path.parse(file.originalname)
    return {
      folder: 'wedank-images',
      format: 'jpeg',
      public_id: `${parse.name + "-" + Date.now() + path.extname(file.originalname)}`,
    };
  }
});

const imageFilter = function (req: any, file: any, cb: any) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};


const upload = multer({
  storage, fileFilter: imageFilter, limits: {
    fileSize: 3 * 1024 * 1024 // 5MB
  }
}).single('avatar')

const multipleUploads = multer({
  storage, fileFilter: imageFilter, limits: {
    fileSize: 3 * 1024 * 1024 // 5MB
  }
}).array('product_images', 4)

const uploadProfile = (req: any, res: any, next: any) => {
  upload(req, res, (err: any) => {
    if (err) {
      return onFailed(res, 400, err.message, err)
    }
    next()
  })
}

const uploadProducts = (req: any, res: any, next: any) => {
  multipleUploads(req, res, (err: any) => {
    if (err) {
      return onFailed(res, 400, err.message, err)
    }
    next()
  })
}

module.exports = { uploadProfile, uploadProducts }

