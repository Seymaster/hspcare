const express = require("express");
const router  = express.Router();
const referralController = require("../controllers/referral");
const middleware = require("../middleware/middleware");
const schemas   = require("../middleware/schemas");


// GET /referrals
router.get("/referrals",referralController.getAllReferral);

// POST /referrals
router.post("/referrals", middleware.addTaskmiddleware(schemas.referralSchema, 'body'),referralController.postReferral);

module.exports = router;