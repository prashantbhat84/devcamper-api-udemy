const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require("../controller/review");
const { protectRoute, authorize } = require("../middleware/auth");
const Review = require("../models/Review");

const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description housing createdAt"
    }),
    getReviews
  )
  .post(protectRoute, authorize("user", "admin"), createReview);
router
  .route("/:id")
  .get(getReview)
  .put(protectRoute, authorize("user", "admin"), updateReview)
  .delete(protectRoute, authorize("user", "admin"), deleteReview);
module.exports = router;
