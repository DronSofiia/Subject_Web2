'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const passengerAllService = require('./../services/passenger.all')
const passengerCreateService = require('./../services/passenger.create')
const passengerByIdService = require('./../services/passenger.byId')
const passengerUpdateService = require('./../services/passenger.update')
const passengerDeleteService = require('./../services/passenger.delete')
const ticketsCountByPassengerIdService = require('./../services/ticket.byPassengerId')

module.exports = {
  async passengerList (req, res) {
    try {
      const passengerList = await passengerAllService()
      res.json(passengerList)
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  },
  async getPassenger (req, res) {
    try {
      const passenger = await passengerByIdService(req.body._id)
      if (!passenger) {
        res.status(404)
        res.json([{ errors: [ { msg: 'Not found' } ] }])
        return
      }
      res.json(passenger)
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  },
  postCreatePassenger: [
    body('name')
      .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    body('surName')
      .isLength({ min: 1 }).trim().withMessage('Surname field must be specified.'),
    body('passportID')
      .isLength({ min: 1 }).trim().withMessage('Passport ID must be specified.'),
    sanitizeBody('name').escape(),
    sanitizeBody('surName').escape(),
    sanitizeBody('passportID').escape(),
    async (req, res) => {
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const passenger = await passengerCreateService(req.body)
          res.json(passenger)
        } catch (error) {
          res.status(422)
          res.json({ errors: [{ msg: error.message }] })
        }
      } else {
        res.status(422)
        res.json({ errors: [{ msg: errors.array() }] })
      }
    }
  ],
  putUpdatePassenger: [
    body('name')
      .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    body('surName')
      .isLength({ min: 1 }).trim().withMessage('Surname field must be specified.'),
    body('passportID')
      .isLength({ min: 1 }).trim().withMessage('Passport ID must be specified.'),
    sanitizeBody('name').escape(),
    sanitizeBody('surName').escape(),
    sanitizeBody('passportID').escape(),
    async (req, res, next) => {
      const passengerData = req.body
      const passenger = await passengerByIdService(passengerData.id)
      if (!passenger) {
        res.status(404)
        res.json([{ errors: [ { msg: 'Not found' } ] }])
        return
      }
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        try {
          const updatedPassenger = await passengerUpdateService(passengerData)
          res.json(updatedPassenger)
        } catch (error) {
          res.status(422)
          res.json({ errors: [{ msg: error.message }] })
        }
      } else {
        res.status(422)
        res.json({ errors: errors.array() })
      }
    }
  ],
  async deletePassenger (req, res) {
    const passengerData = req.body
    const passenger = await passengerByIdService(passengerData.id)
    if (!passenger) {
      res.status(404)
      res.json([{ errors: [ { msg: 'Not found' } ] }])
      return
    }
    const countTickets = await ticketsCountByPassengerIdService(passengerData.id)
    if (countTickets !== 0) {
      res.status(422)
      res.json({ errors: [{ msg: `You can not delete passenger that has already bought a ticket!` }] })
    } else {
      try {
        const deletedPassenger = await passengerDeleteService(passengerData)
        res.json(deletedPassenger)
      } catch (error) {
        res.status(422)
        res.json({ errors: [{ msg: error.message }] })
      }
    }
  }
}
