const express = require("express");
const Router = express.Router({ mergeParams: true });
const { getCourses } = require("../controllers/courses");

Router.route("/").get(getCourses);

module.exports = Router;
