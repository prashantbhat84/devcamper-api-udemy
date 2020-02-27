const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const Review = require("../models/Review");
//@desc  get  reviews
//@method   GET /api/v1/reviews
//@method   GET /api/v1/bootcamp/:bootcampId/reviews
//@access   public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
//@desc  get single  review
//@method   GET /api/v1/reviews/:id
//@access   public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });
  if (!review) {
    return next(
      new ErrorResponse(`No Review found with ID ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: review });
});
