const Product = require('./../models/product')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const product = new Product({
    sku: data.sku,
    name: data.name,
    price: data.price,
    weight: data.weight,
    volume: data.volume
  })

  return new Promise((resolve, reject) => {
    product.save(function (err, createdProduct) {
      if (err) {
        reject(err)
      } else {
        resolve(createdProduct)
      }
    })
  })
}
