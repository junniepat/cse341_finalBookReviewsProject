const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//date variable for easier use
let reviewDate = new Date();

//creates the schema for the database

const reviewSchema = new Schema({
    userName:
    {
        type: String,
        required: true,
    },
    title:
    {
        type: String,
        required: true
    },
    author:
    {
        type: String,
        required: true
    },
    rating:
    {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewSummary:
    {
        type: String
    },
    datePost:
    {
        type: Date,
        //gets the date and displays it like xxxx-xx-xx
        default: 
        reviewDate.getFullYear() + '-' + (reviewDate.getMonth()+1) + '-' + reviewDate.getDate()
    }
});

module.exports = mongoose.model('Review', reviewSchema);