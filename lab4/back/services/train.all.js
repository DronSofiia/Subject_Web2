const Train = require('./../models/train')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    Train.find({})
      .exec(function (err, trains) {
        if (err) {
          reject(err)
        } else {
          resolve(trains)
        }
      })
  })
}
