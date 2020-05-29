const mongoose = require('mongoose')

const Schema = mongoose.Schema

const trainSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  route: { type: String, required: true, max: 50 },
  number: { type: Number, required: true, unique: true, min: 1 },
  seatsQuantity: { type: Number, required: true, min: 1, max: 1000 }
})

module.exports = mongoose.model('Train', trainSchema)
