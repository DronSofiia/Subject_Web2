const Ticket = require('./../models/ticket')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    Ticket.find({})
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
