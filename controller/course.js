const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
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
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!course) {
    return next(
      new ErrorResponse(`Resource with ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: course });
});
//@desc  Create a new Course
//@method   POST /api/v1/bootcamps/:bootcampId/courses
//@access   private
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with ${req.params.bootcampId} not found`, 404)
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({ success: true, data: course });
});
