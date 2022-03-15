const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:
    {
        type: String,
        required: true,
        min: 2,
        max: 55
    },
    lastName:
    {
        type: String,
        required: true,
        min: 2,
        max: 55
    },
    email:
    {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Review', userSchema);