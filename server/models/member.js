const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  accepted: Boolean,
  userId: String,
  boardId: String
})


module.exports = mongoose.model('Member', memberSchema);