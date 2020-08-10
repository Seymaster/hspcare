const { config, uploader } = require("cloudinary").v2

let localconfig = {
    api_key: process.env.apiKey,
    cloud_name: process.env.cloudName,
    api_secret: process.env.apiSecret
};

const cloudinaryConfig = (req,res,next)=>{
    config(localconfig);
    next();
};

module.exports = {cloudinaryConfig, uploader};