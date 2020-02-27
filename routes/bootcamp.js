const express = require("express");
// Resource Router single bootcamp  many courses
const courseRouter = require("./course");
const reviewRouter = require("./review");
//protect route middleware
const { protectRoute, authorize } = require("../middleware/auth");

const advancedResults = require("../middleware/advancedResults");
const Router = express.Router();
const Bootcamp = require("../models/Bootcamp");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto
} = require("../controller/bootcamp");
// Re-route into other  resource routers
Router.use("/:bootcampId/courses", courseRouter);
Router.use("/:bootcampId/reviews", reviewRouter);
// get bootcamps within vicinity
Router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
Router.route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protectRoute, authorize("publisher", "admin"), createBootcamp);
Router.route("/:id")
  .get(getBootcamp)
  .put(protectRoute, authorize("publisher", "admin"), updateBootcamp)
  .delete(protectRoute, authorize("publisher", "admin"), deleteBootcamp);
Router.route("/:id/photo").put(
  protectRoute,
  authorize("publisher", "admin"),
  uploadBootcampPhoto
);

module.exports = Router;
