"use strict"

const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const referralSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ReferralModel = mongoose.model('Referral', referralSchema);

module.exports = ReferralModel;