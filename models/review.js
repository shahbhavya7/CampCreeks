const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: String,
    rating: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // it will refer to the User model
    }
});


module.exports = mongoose.model('Review', reviewSchema); // it will export the model Review with the schema reviewSchema