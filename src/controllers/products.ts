import { onFailed, onSuccess } from "../helpers/response"
const { getProductsTotalModel, updateImagesModel: updateImages, getDetailProductModel: detailModel, updateProductModel: updateModel, createProductsModel: createModel, insertImagesModel: imagesModel, getAllProductsModel: getAllModel } = require('../models/products')
const { generateOTP } = require('../helpers/otpGenerator')
const { pagination } = require('../helpers/pagination')

const getAllProductsController = async (req: any, res: any) => {
  try {
    const { page, limit, order, sort, search, type, min, max } = req.query
    const totalResponse = await getProductsTotalModel(limit, order, sort, search, type, min, max)
    const response = await getAllModel(page, limit, order, sort, search, type, min, max)
    const result = response.rows.map((item: any) => {
      const imgValues = Object.values(item).filter((i: any) => {
        return String(i).includes('image')
      })
      return { id: item.id, name: item.name, price: item.price, size: item.size, type_id: item.type_id, created_at: item.created_at, description: item.description, image: imgValues }
    })
    const total = Number(totalResponse.rows[0]['total'])
    onSuccess(res, 200, 'Get all products successfully', result, pagination(page, limit, total, req.query, '/products'))
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const createProductsController = async (req: any, res: any) => {
  try {
    const images_id = generateOTP()
    const { name, price, size, typeId, description } = req.body
    const { files } = req
      await createModel(name, Number(price), size.toUpperCase(), typeId, description, images_id)
      await imagesModel(images_id, files[0].path, files[1].path, files[2].path, files[3].path)
    return onSuccess(res, 200, 'Create product successfully')
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const updateProductController = async (req: any, res: any) => {
  try {
    const { imagesid } = req.params
    const { name, price, size, type_id, description } = req.body
    const { files } = req
    await updateModel(name, Number(price), size.toUpperCase(), Number(type_id), description, imagesid)
    await updateImages(files[0]?.path, files[1]?.path, files[2]?.path, files[3]?.path, imagesid)
    onSuccess(res, 200, 'Update Product successfully')
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

const getDetailProductController = async (req: any, res: any) => {
  try {
    const { id } = req.params
    const response = await detailModel(id)
    onSuccess(res, 200, 'Get Detail Product successfully', response.rows)
  } catch (error: any) {
    onFailed(res, 500, 'Internal Server Error', error.message)
  }
}

module.exports = { getDetailProductController, createProductsController, getAllProductsController, updateProductController }