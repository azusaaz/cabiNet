const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rate: Number,
    comment: String,
    userId: String,
    contentId: String
})

module.exports = mongoose.model('Review', reviewSchema);