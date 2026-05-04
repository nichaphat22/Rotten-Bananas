const mongoose = require('mongoose');

const Schema = mongoose.Schema
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    imgNews: {
        type: String,
        require: true
    }

}, {timestamps: true})
const News = mongoose.model('News', newsSchema);

module.exports = News;