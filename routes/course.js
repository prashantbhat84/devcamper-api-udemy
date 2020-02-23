const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const Course = require("../models/Course");
//protect route middleware
const { protectRoute } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controller/course");
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description housing createdAt"
    }),
    getCourses
  )
  .post(protectRoute, createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protectRoute, updateCourse)
  .delete(protectRoute, deleteCourse);

module.exports = router;
