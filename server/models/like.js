const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    liked: Boolean,
    userId: String,
    contentId: String
})

module.exports = mongoose.model('Like', likeSchema);