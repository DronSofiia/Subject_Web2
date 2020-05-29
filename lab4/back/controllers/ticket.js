'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const ticketAllService = require('./../services/ticket.all')
const ticketCreateService = require('./../services/ticket.create')
const ticketByIdService = require('./../services/ticket.byId')
const ticketUpdateService = require('./../services/ticket.update')
const ticketDeleteService = require('./../services/ticket.delete')
const passengerAllService = require('./../services/passenger.all')
const trainAllService = require('./../services/train.all')
const trainByIdService = require('./../services/train.byId')
const ticketCheckService = require('./../services/ticket.check')

module.exports = {
  async ticketList (req, res) {
    try {
      const ticketList = await ticketAllService()
      res.json(ticketList)
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  },
  async getTicket (req, res) {
    try {
      const ticket = await ticketByIdService(req.body._id)
      if (!ticket) {
        res.status(404)
        res.json([{ errors: [ { msg: 'Not found' } ] }])
        return
      }
      res.json(ticket)
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  },
  postCreateTicket: [
    body('number')
      .isLength({ min: 1 }).trim().withMessage('Number field must be specified and integer.'),
    body('price')
      .isLength({ min: 1 }).trim().withMessage('Price field must be specified and float.'),
    body('passenger_id')
      .isLength({ min: 1 }).trim().withMessage('Passenger field must be specified and integer.'),
    body('train_id')
      .isLength({ min: 1 }).trim().withMessage('Train field must be specified and integer.'),
    body('seatNumber')
      .isLength({ min: 1 }).trim().withMessage('Seat number field must be specified and integer.'),
    body('date')
      .isLength({ min: 1 }).trim().withMessage('Date field must be specified.'),
    sanitizeBody('number').escape(),
    sanitizeBody('price').escape(),
    sanitizeBody('passenger_id').escape(),
    sanitizeBody('train_id').escape(),
    sanitizeBody('seatNumber').escape(),
    sanitizeBody('date').escape(),
    async (req, res) => {
      const ticketData = req.body
      const passengers = await passengerAllService()
      const trains = await trainAllService()
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const train = await trainByIdService(ticketData.train_id)
          if (ticketData.seatNumber <= train.seatsQuantity) {
            const identiqueTicketsCount = await ticketCheckService(ticketData, train)
            if (identiqueTicketsCount !== 0) {
              res.status(422)
              res.json([{ errors: [ { msg: 'That ticket is already sold!' } ] }])
              return
            } else {
              const ticket = await ticketCreateService(req.body)
              req.json(ticket)
            }
          } else {
            res.status(422)
            res.json([{ errors: [ { msg: 'This train does not have that seat!' } ] }])
            return
          }
        } catch (error) {
          res.status(422)
          res.json({ newTicket: ticketData,
            passengers: passengers,
            trains: trains,
            errors: [{ msg: error.message }] })
        }
      } else {
        res.status(422)
        res.json({ newTicket: ticketData,
          passengers: passengers,
          trains: trains,
          errors: [{ msg: errors.array() }] })
      }
    }
  ],
  putUpdateTicket: [
    body('number')
      .isLength({ min: 1 }).trim().withMessage('Number field must be specified and integer.'),
    body('price')
      .isLength({ min: 1 }).trim().withMessage('Price field must be specified and float.'),
    body('passenger_id')
      .isLength({ min: 1 }).trim().withMessage('Passenger field must be specified and integer.'),
    body('train_id')
      .isLength({ min: 1 }).trim().withMessage('Train field must be specified and integer.'),
    body('seatNumber')
      .isLength({ min: 1 }).trim().withMessage('Seat number field must be specified and integer.'),
    body('date')
      .isLength({ min: 1 }).trim().withMessage('Date field must be specified.'),
    sanitizeBody('number').escape(),
    sanitizeBody('price').escape(),
    sanitizeBody('passenger_id').escape(),
    sanitizeBody('train_id').escape(),
    sanitizeBody('seatNumber').escape(),
    sanitizeBody('date').escape(),
    async (req, res, next) => {
      const ticketData = req.body
      const passengers = await passengerAllService()
      const trains = await trainAllService()
      const ticket = await ticketByIdService(ticketData.id)
      if (!ticket) {
        res.status(404)
        res.json([{ errors: [ { msg: 'Not found' } ] }])
        return
      }
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        try {
          const train = await trainByIdService(ticketData.train_id)
          if (ticketData.seatNumber <= train.seatsQuantity) {
            const identiqueTicketsCount = await ticketCheckService(ticketData, train)
            if (identiqueTicketsCount !== 0) {
              res.status(422)
              res.json([{ errors: [ { msg: 'That ticket is already sold!' } ] }])
              return
            } else {
              const updatedTicket = await ticketUpdateService(ticketData)
              req.json(updatedTicket)
            }
          } else {
            res.status(422)
            res.json([{ errors: [ { msg: 'This train does not have that seat!' } ] }])
            return
          }
        } catch (error) {
          res.status(422)
          res.json({ ticket: {},
            newTicket: ticketData,
            passengers: passengers,
            trains: trains,
            errors: [{ msg: error.message }] })
        }
      } else {
        res.status(422)
        res.json({ ticket: {},
          newTicket: ticketData,
          passengers: passengers,
          trains: trains,
          errors: [{ msg: errors.array() }] })
      }
    }
  ],
  async deleteTicket (req, res) {
    const ticketData = req.body
    const ticket = await ticketByIdService(ticketData.id)
    if (!ticket) {
      res.status(404)
      res.json([{ errors: [ { msg: 'Not found' } ] }])
      return
    }
    try {
      const deletedTicket = await ticketDeleteService(ticketData)
      res.json(deletedTicket)
    } catch (error) {
      res.status(422)
      res.json({ errors: [{ msg: error.message }] })
    }
  }
}
