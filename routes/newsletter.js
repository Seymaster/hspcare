const express = require("express");
const router  = express.Router();
const newsletterController = require("../controllers/newsletter");
const middleware = require("../middleware/middleware");
const schemas   = require("../middleware/schemas");


// GET /gets all emails 
router.get("/newsletter",newsletterController.getAllNewsletter);

// POST /saves email
router.post("/newsletter", middleware.addTaskmiddleware(schemas.newsletterSchema.newsletterPost, 'body'), newsletterController.postNewsletter);

module.exports = router;