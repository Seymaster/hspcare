"use strict"

const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const newsletterSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;
