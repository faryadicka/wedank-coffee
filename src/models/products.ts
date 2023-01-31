const dbProducts = require("../configs/database");
const { v4: uuid } = require("uuid");

const getAllProductsModel = (page: any = '1', limit: any) => {
  return new Promise((resolve: any, reject: any) => {
    const offset = (Number(page) - 1) * Number(limit);
    const value = []
    let SQL = "SELECT p.created_at, p.id, p.name, p.images_id, p.price, p.size, p.type_id, p.description, pi2.image1, pi2.image2, pi2.image3, pi2.image4 FROM products as p LEFT JOIN product_images as pi2 ON p.images_id = pi2.id"
    if (limit) {
      SQL += " LIMIT $1 OFFSET $2"
      value.push(limit, offset)
    }
    dbProducts.query(SQL, value, (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const createProductsModel = (name: any, price: any, size: any, type_id: any, description: any, images_id: any) => {
  return new Promise((resolve: any, reject: any) => {
    const id = uuid();
    dbProducts.query("INSERT INTO products (id, name, price, size, type_id, description, images_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, now())", [id, name, price, size, type_id, description, images_id], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const insertImagesModel = (id: any, image1: any, image2: any, image3: any, image4: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbProducts.query("INSERT INTO product_images (id, image1, image2, image3, image4) VALUES ($1, $2, $3, $4, $5)", [id, image1, image2, image3, image4], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const updateImagesModel = (image1: any, image2: any, image3: any, image4: any, id: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbProducts.query("UPDATE product_images SET image1=COALESCE($1, image1), image2=COALESCE($2, image2), image3=COALESCE($3, image3), image4=COALESCE($4, image4) WHERE id = $5", [image1, image2, image3, image4, id], (err: any, res: any) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = { createProductsModel, insertImagesModel, getAllProductsModel }