const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const Course = require("../models/Course");

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
  .post(createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
