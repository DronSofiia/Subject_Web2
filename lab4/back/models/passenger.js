const mongoose = require('mongoose')

const Schema = mongoose.Schema

const passengerSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  surName: { type: String, required: true, max: 50 },
  passportID: { type: String, required: true, unique: true, max: 50 }
})

module.exports = mongoose.model('Passenger', passengerSchema)
