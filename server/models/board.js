const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const boardSchema = new Schema({
  title: String,
  desc: String,
  userId: String
})

module.exports = mongoose.model('Board',boardSchema);