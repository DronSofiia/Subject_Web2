'use strict'

const ticketAllService = require('./../services/ticket.all')
const trainAllService = require('./../services/train.all')

module.exports = {
  async reportsMostPopular (req, res) {
    try {
      const tickets = await ticketAllService()
      res.json(calculateMostPopular(tickets))
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  },
  async reportsMostProfitable (req, res) {
    try {
      const tickets = await ticketAllService()
      res.json(calculateMostProfitable(tickets))
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  },
  async reportsWithoutSoldTickets (req, res) {
    try {
      const tickets = await ticketAllService()
      const trains = await trainAllService()
      res.json(routesWithoutSoldTickets(trains, tickets))
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  }
}

function calculateMostPopular (tickets) {
  let arr = []
  tickets.forEach(ticket => {
    const direction = ticket.train.name + '-' + ticket.train.route
    const index = arr.findIndex(item => item.direction === direction)
    if (index === -1) {
      arr.push({ direction: direction, ticketCount: 1 })
    } else {
      arr[index].ticketCount++
    }
  })
  arr.sort(function (a, b) { return a.ticketCount - b.ticketCount })
  return arr
}
function calculateMostProfitable (tickets) {
  let arr = []
  tickets.forEach(ticket => {
    const direction = ticket.train.name + '-' + ticket.train.route
    const index = arr.findIndex(item => item.direction === direction)
    if (index === -1) {
      arr.push({ direction: direction, sum: ticket.price })
    } else {
      arr[index].sum += ticket.price
    }
  })
  arr.sort(function (a, b) { return a.sum - b.sum })
  return arr
}
function routesWithoutSoldTickets (trains, tickets) {
  let arr = []
  trains.forEach(train => {
    const direction = train.name + '-' + train.route
    const index = tickets.findIndex(item => (item.train.name + '-' + item.train.route) === direction)
    if (index === -1) {
      if (!arr.some(item => item.direction === direction)) {
        arr.push({ direction: direction })
      }
    }
  })
  return arr
}
