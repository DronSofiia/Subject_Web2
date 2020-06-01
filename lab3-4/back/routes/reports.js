'use strict'

const express = require('express')
const router = express.Router()

const indexController = require('./../controllers/reports')

router.get('/popular', indexController.reportsMostPopular)
router.get('/profitable', indexController.reportsMostProfitable)
router.get('/without', indexController.reportsWithoutSoldTickets)

module.exports = router
