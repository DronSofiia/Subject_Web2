const Passenger = require('./../models/passenger')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const passengerData = {
    name: data.name,
    surName: data.surName,
    passportID: data.passportID
  }

  return new Promise((resolve, reject) => {
    Passenger.findByIdAndUpdate(
      data.id,
      { $set: passengerData },
      { new: true },
      function (err, updatedPassenger) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedPassenger)
        }
      })
  })
}
