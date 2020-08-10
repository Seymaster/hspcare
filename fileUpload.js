let multer   = require("multer");

let storage = multer.diskStorage({
            filename: function (request, file, callback) {
                callback(null, `${ Date.now() }-${ file.originalname }`);
            }
        });

function match_image (file) {
        return file.originalname.match(/\.(svg|jpg|jpeg|png|pdf|gif|x-png|x-zip-compressed)$/ig);
    }

let media_filter = (request, file, callback) =>{
            if (!match_image(file)) {
                return callback(new Error('Unsupported media type'), false);
            }
            callback(null, true);
        };


let profileUpload = multer({ storage:storage, fileFilter: media_filter }).single('uploadfile');

module.exports  = {profileUpload} ;