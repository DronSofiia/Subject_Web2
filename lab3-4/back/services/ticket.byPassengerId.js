const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function (passengerId) {
  return new Promise((resolve, reject) => {
    Ticket.find({ 'passenger': passengerId })
      .countDocuments()
      .exec(function (err, countTickets) {
        if (err) {
          reject(err)
        } else {
          resolve(countTickets)
        }
      })
  })
}
