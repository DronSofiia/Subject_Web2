const Passenger = require('./../models/passenger')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const passenger = new Passenger({
    name: data.name,
    surName: data.surName,
    passportID: data.passportID
  })

  return new Promise((resolve, reject) => {
    passenger.save(function (err, createdPassenger) {
      if (err) {
        reject(err)
      } else {
        resolve(createdPassenger)
      }
    })
  })
}
