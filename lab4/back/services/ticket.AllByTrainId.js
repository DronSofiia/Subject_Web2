const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function (trainId) {
  return new Promise((resolve, reject) => {
    Ticket.find({ 'train': trainId })
      .populate('passenger')
      .populate('train')
      .exec(function (err, tickets) {
        if (err) {
          reject(err)
        } else {
          resolve(tickets)
        }
      })
  })
}
