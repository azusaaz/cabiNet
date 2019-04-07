const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const categorySchema = new Schema({
  title: String,
  boardId: String
})

module.exports = mongoose.model('Category',categorySchema);