'use strict'

const express = require('express')
const router = express.Router()

const trainController = require('./../controllers/train')

router.get('/list', trainController.trainList)
router.post('/list', trainController.getTrain)
router.post('/add', trainController.postCreateTrain)
router.post('/edit/:id', trainController.putUpdateTrain)
router.post('/remove/:id', trainController.deleteTrain)

module.exports = router
