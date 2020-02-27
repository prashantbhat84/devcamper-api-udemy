const express = require("express");
const router = express.Router({ mergeParams: true });
const { getReviews } = require("../controller/review");
const { protectRoute, authorize } = require("../middleware/auth");
const Review = require("../models/Review");

const advancedResults = require("../middleware/advancedResults");

router.route("/").get(
  advancedResults(Review, {
    path: "bootcamp",
    select: "name description housing createdAt"
  }),
  getReviews
);

module.exports = router;
