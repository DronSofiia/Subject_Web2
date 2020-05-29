const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function (trainId) {
  return new Promise((resolve, reject) => {
    Ticket.find({ 'train': trainId })
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
