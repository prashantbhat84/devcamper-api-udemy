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
//@desc  Create   review
//@method   POST /api/v1/bootcamps/:bootcampId/reviews/
//@access   private
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp with ID ${req.params.bootcampId} does not exist`,
        404
      )
    );
  }
  const review = await Review.create(req.body);

  res.status(201).json({ success: true, data: review });
});
