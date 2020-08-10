"use strict"

const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const workwithusSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    uploadResume: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WorkwithusModel = mongoose.model('Workwithus', workwithusSchema);

module.exports = WorkwithusModel;