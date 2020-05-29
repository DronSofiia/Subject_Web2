'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const trainAllService = require('./../services/train.all')
const trainCreateService = require('./../services/train.create')
const trainByIdService = require('./../services/train.byId')
const trainUpdateService = require('./../services/train.update')
const trainDeleteService = require('./../services/train.delete')
const ticketsCountByTrainIdService = require('./../services/ticket.byTrainId')

module.exports = {
  async trainList (req, res) {
    try {
      const trainList = await trainAllService()
      res.json(trainList)
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  },
  async getTrain (req, res) {
    try {
      const train = await trainByIdService(req.body._id)
      if (!train) {
        res.status(404)
        res.json([{ errors: [ { msg: 'Not found' } ] }])
        return
      }
      res.json(train)
    } catch (error) {
      res.status(500)
      res.json({ errors: [{ msg: error.message }] })
    }
  },
  postCreateTrain: [
    body('name')
      .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    body('route')
      .isLength({ min: 1 }).trim().withMessage('Route field must be specified.'),
    body('number')
      .isLength({ min: 1 }).trim().withMessage('Number must be specified.'),
    body('seatsQuantity')
      .isLength({ min: 1 }).trim().withMessage('Seats quantity field must be specified.'),
    sanitizeBody('name').escape(),
    sanitizeBody('route').escape(),
    sanitizeBody('number').escape(),
    sanitizeBody('seatsQuantity').escape(),
    async (req, res) => {
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const train = await trainCreateService(req.body)
          req.json(train)
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
  putUpdateTrain: [
    body('name')
      .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    body('route')
      .isLength({ min: 1 }).trim().withMessage('Route field must be specified.'),
    body('number')
      .isLength({ min: 1 }).trim().withMessage('Number must be specified.'),
    body('seatsQuantity')
      .isLength({ min: 1 }).trim().withMessage('Seats quantity field must be specified.'),
    sanitizeBody('name').escape(),
    sanitizeBody('route').escape(),
    sanitizeBody('number').escape(),
    sanitizeBody('seatsQuantity').escape(),
    async (req, res, next) => {
      const trainData = req.body
      const train = await trainByIdService(trainData.id)
      if (!train) {
        res.status(404)
        res.json([{ errors: [ { msg: 'Not found' } ] }])
        return
      }
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        try {
          const updatedTrain = await trainUpdateService(trainData)
          req.json(updatedTrain)
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
  async deleteTrain (req, res) {
    const trainData = req.body
    const train = await trainByIdService(trainData.id)
    if (!train) {
      res.status(404)
      res.json([{ errors: [ { msg: 'Not found' } ] }])
      return
    }
    const countTickets = await ticketsCountByTrainIdService(trainData.id)
    if (countTickets !== 0) {
      res.status(422)
      res.json({ errors: [{ msg: `You can not delete train on which tickets are already sold!` }] })
    } else {
      try {
        const deletedTrain = await trainDeleteService(trainData)
        res.json(deletedTrain)
      } catch (error) {
        res.status(422)
        res.json({ errors: [{ msg: error.message }] })
      }
    }
  }
}
