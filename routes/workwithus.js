const express = require("express");
const router  = express.Router();
const workwithusController = require("../controllers/workwithus");
const middleware = require("../middleware/middleware");
const schemas   = require("../middleware/schemas");
const { cloudinaryConfig, uploader } = require("../config/cloud");
const { profileUpload } = require("../fileUpload")



// GET /work-with-us
router.get("/work-with-us", workwithusController.getAllWorkwithus);

// POST /work-with-us
router.use("*",cloudinaryConfig)
router.post("/work-with-us",profileUpload, middleware.addTaskmiddleware(schemas.workwithusSchema.workwithusPost, 'body'), workwithusController.postWorkwithus);


module.exports = router;