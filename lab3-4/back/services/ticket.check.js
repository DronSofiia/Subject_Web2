const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function (ticketData, train) {
  return new Promise((resolve, reject) => {
    Ticket.find({ 'train': train.id, 'seatNumber': ticketData.seatNumber, 'date': ticketData.date })
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
