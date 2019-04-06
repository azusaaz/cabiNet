const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const contentSchema = new Schema({
  title: String,
  desc: String,
  url: String,
  imageUrl: String,
  userId: String,
  boardId: String,
  categoryId: String
})

module.exports = mongoose.model('Content',contentSchema);