'use strict'

const express = require('express')
const router = express.Router()

const passengerController = require('./../controllers/passenger')

router.get('/list', passengerController.passengerList)
router.post('/list', passengerController.getPassenger)
router.post('/add', passengerController.postCreatePassenger)
router.post('/edit/:id', passengerController.putUpdatePassenger)
router.post('/remove/:id', passengerController.deletePassenger)

module.exports = router
