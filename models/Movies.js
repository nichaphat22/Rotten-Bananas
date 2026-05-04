const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    type:{
        type: String,
        required : true
    },
    detail:{
        type: String,
        required : true

    },
    year:{
        type: String,
        required : true

    },
    imgM:{
        type: String

    },
    scoreM:{
        type: String

    }
        
},{timestamps:true});

const Movies = mongoose.model('movies', movieSchema);

module.exports = Movies;