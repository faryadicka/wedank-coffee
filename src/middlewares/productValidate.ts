import { onFailed } from "../helpers/response"

const inputCreateProduct = (req: any, res: any, next: any) => {
  const { name, price, size, typeId, description } = req.body
  const { files } = req
  console.log(name)
  if (!name || name.length === 0) {
    return onFailed(res, 404, 'Name input field cant be empty', null)
  }
  if (!price || price.length === 0) {
    return onFailed(res, 404, 'Price input field cant be empty', null)
  }
  if (!size || size.length === 0) {
    return onFailed(res, 404, 'Size input field cant be empty', null)
  }
  if (!typeId || typeId.length === 0) {
    return onFailed(res, 404, 'Type input field cant be empty', null)
  }
  if (!description || description.length === 0) {
    return onFailed(res, 404, 'Description input field cant be empty', null)
  }
  if (files.length === 0) {
    return onFailed(res, 400, 'Please input images!', null)
  }
  next()
}

module.exports = { inputCreateProduct }