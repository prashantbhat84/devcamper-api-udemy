const express = require("express");
const Router = express.Router({ mergeParams: true });
const { getCourses, getCourse, addCourse } = require("../controllers/courses");

Router.route("/")
  .get(getCourses)
  .post(addCourse);
Router.route("/:id").get(getCourse);

module.exports = Router;
