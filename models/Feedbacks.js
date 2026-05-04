const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true

    }
    

}, { timestamps: true });

const Feedbacks = mongoose.model('feedbacks', feedbackSchema);

module.exports = Feedbacks;