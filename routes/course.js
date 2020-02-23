const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const Course = require("../models/Course");
//protect route middleware
const { protectRoute, authorize } = require("../middleware/auth");

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
  .post(protectRoute, authorize("publisher", "admin"), createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protectRoute, authorize("publisher", "admin"), updateCourse)
  .delete(protectRoute, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
