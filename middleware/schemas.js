const Joi = require("joi");

const referralSchema = {
    referalPost: Joi.object().keys({
        name: Joi.string().required(),
        occupation: Joi.string().required(),
        company: Joi.string().required(),
        address: Joi.string().required(),
        phoneNumber: Joi.number().min(11).max(15),
        email: Joi.string().trim().email()
    })
}

const workwithusSchema = {
    workwithusPost: Joi.object().keys({
        fullName: Joi.string().required(),
        gender: Joi.string().trim().required(),
        coverLetter: Joi.string().description().required(),
        uploadfile: Joi.string().required()
    })
}

module.exports = {referralSchema,workwithusSchema};