﻿'use strict'

// add 
// var path = require('path')
// var express = require('express')
// var app = express()

// app.use('/assets', express.static(path.join(__dirname, "../assets")))

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
require('./db')(config)

const notFoundMiddleware = require('./middlewares/not_found')
const corsMiddleware = require('cors')

const indexRoutes = require('./routes')
const locationRoutes = require('./routes/location')
const locationTypeRoutes = require('./routes/location_type')
const passengerRoutes = require('./routes/passenger')
const trainRoutes = require('./routes/train')
const ticketRoutes = require('./routes/ticket')
const reportsRoutes = require('./routes/reports')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname))
app.use(express.static(__dirname + '/public'))
app.use(corsMiddleware())
app.use('/', indexRoutes)
app.use('/location', locationRoutes)
app.use('/location-type', locationTypeRoutes)
app.use('/passenger', passengerRoutes)
app.use('/train', trainRoutes)
app.use('/ticket', ticketRoutes)
app.use('/reports', reportsRoutes)

app.use(notFoundMiddleware)

const { host, port } = config

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})
