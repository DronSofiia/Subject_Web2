const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  number: { type: Number, required: true, unique: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  passenger: { type: Schema.Types.ObjectId, ref: 'Passenger', required: true },
  train: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
  seatNumber: { type: Number, required: true, min: 1, max: 1000 },
  date: { type: Date, required: true }
})

module.exports = mongoose.model('Ticket', ticketSchema)
