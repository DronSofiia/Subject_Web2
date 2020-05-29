'use strict'

const express = require('express')
const router = express.Router()

const ticketController = require('./../controllers/ticket')

router.get('/list', ticketController.ticketList)
router.post('/list', ticketController.getTicket)
router.post('/add', ticketController.postCreateTicket)
router.post('/edit/:id', ticketController.putUpdateTicket)
router.post('/remove/:id', ticketController.deleteTicket)

module.exports = router
