const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
//@desc  get  courses
//@method   GET /api/v1/courses
//@method   GET /api/v1/bootcamp/:bootcampId/courses
//@access   public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    //populate same as join
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description housing createdAt"
    });
  }
  const courses = await query;
  res.status(200).json({ success: true, count: courses.length, data: courses });
});
//@desc  get a single course
//@method   GET /api/v1/courses/:id
//@access   public
exports.getCourse = asyncHandler(async (req, res, next) => {
  console.log("get course hit");

  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!course) {
    return next(
      new ErrorResponse(`Resource with ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, count: courses.length, data: course });
});
