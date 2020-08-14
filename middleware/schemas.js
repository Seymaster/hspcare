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
        coverLetter: Joi.string().required(),
        uploadfile: Joi.string().required()
    })
}

const newsletterSchema = {
    newsletterPost: Joi.object().keys({
        email: Joi.string().trim().email().required
    })
}

module.exports = {referralSchema,workwithusSchema,newsletterSchema};