const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse
} = require("../controller/course");
router
  .route("/")
  .get(getCourses)
  .post(createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse);

module.exports = router;
