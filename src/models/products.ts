const dbProducts = require("../configs/database");
const { v4: uuid } = require("uuid");

const getAllProductsModel = (page: any = '1', limit: any, order: any = 'ASC', sort: any = 'name', search: any = '', type: any, min: any, max: any) => {
  return new Promise((resolve: any, reject: any) => {
    const offset = (Number(page) - 1) * Number(limit);
    const value = []
    let SQL = "SELECT p.created_at, p.id, p.name as name, p.images_id, p.price as price, p.size as size, p.type_id as type, p.description, pi2.image1, pi2.image2, pi2.image3, pi2.image4 FROM products as p LEFT JOIN product_images as pi2 ON p.images_id = pi2.id"
    if (min && max && type && search && order && sort && limit) {
      SQL += " WHERE price BETWEEN $1 AND $2 AND lower(name) LIKE lower('%' || $3 || '%') AND type_id = $4 ORDER BY " + sort + " " + order + " LIMIT $5 OFFSET $6"
      value.push(min, max, search, type, limit, offset)
    }
    if (min && max && !type && !search && order && sort && limit) {
      SQL += " WHERE price BETWEEN $1 AND $2 ORDER BY " + sort + " " + order + " LIMIT $3 OFFSET $4"
      value.push(min, max, limit, offset)
    }
    if (min && max && !type && search && order && sort && limit) {
      SQL += " WHERE price BETWEEN $1 AND $2 AND lower(name) LIKE lower('%' || $3 || '%') ORDER BY " + sort + " " + order + " LIMIT $4 OFFSET $5"
      value.push(min, max, search, limit, offset)
    }
    if (min && max && type && !search && order && sort && limit) {
      SQL += " WHERE price BETWEEN $1 AND $2 AND type_id = $3 ORDER BY " + sort + " " + order + " LIMIT $4 OFFSET $5"
      value.push(min, max, type, limit, offset)
    }
    if (type && search && order && sort && limit && !max && !min) {
      SQL += " WHERE lower(name) LIKE lower('%' || $1 || '%') AND type_id = $2 ORDER BY " + sort + " " + order + " LIMIT $3 OFFSET $4"
      value.push(search, type, limit, offset)
    }
    if (type && order && sort && limit && !search && !max && !min) {
      SQL += " WHERE type_id = $1 ORDER BY " + sort + " " + order + " LIMIT $2 OFFSET $3"
      value.push(type, limit, offset)
    }
    if (search && order && sort && limit && !type && !max && !min) {
      SQL += " WHERE lower(name) LIKE lower('%' || $1 || '%') ORDER BY " + sort + " " + order + " LIMIT $2 OFFSET $3"
      value.push(search, limit, offset)
    }
    if (order && limit && sort && !search && !type && !max && !min) {
      SQL += " ORDER BY " + sort + " " + order + " LIMIT $1 OFFSET $2"
      value.push(limit, offset)
    }
    if (limit && !order && !sort && !search && !type && !max && !min) {
      SQL += " LIMIT $1 OFFSET $2"
      value.push(limit, offset)
    }
    console.log({ SQL })
    console.log({ offset })
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

const updateProductModel = (name: any, price: any, size: any, type: any, description: any, id: any) => {
  return new Promise((resolve: any, reject: any) => {
    dbProducts.query("UPDATE products SET name=COALESCE($1, name), price=COALESCE($2, price), size=COALESCE($3, size), type_id=COALESCE($4, type_id), description=COALESCE($5, description), updated_at=now() WHERE id = $6 RETURNING *", [name, price, size, type, description, id], (err: any, res: any) => {
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

module.exports = { createProductsModel, insertImagesModel, getAllProductsModel, updateProductModel }