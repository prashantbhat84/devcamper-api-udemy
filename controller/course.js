const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
//@desc  get  courses
//@method   GET /api/v1/courses
//@method   GET /api/v1/bootcamp/:bootcampId/courses
//@access   public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    //populate same as join
    // query = Course.find().populate({
    //   path: "bootcamp",
    //   select: "name description housing createdAt"
    // });
    res.status(200).json(res.advancedResults);
  }
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
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with ${req.params.bootcampId} not found`, 404)
    );
  }
  //check if the logged in user is the bootcamp owner
  if (req.user.id !== bootcamp.user.toString() && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        ` User ${req.user.id} is not authorized to add a course to bootcamp ${req.body.bootcamp}`,
        401
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({ success: true, data: course });
});
//@desc  Update a new Course
//@method   PUT /api/v1/courses/:id
//@access   private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`course with ${req.params.id} not found`, 404)
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: course });
});
//@desc  Update a new Course
//@method   PUT /api/v1/courses/:id
//@access   private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`course with ${req.params.id} not found`, 404)
    );
  }
  course.remove();

  res.status(200).json({ success: true, data: {} });
});
