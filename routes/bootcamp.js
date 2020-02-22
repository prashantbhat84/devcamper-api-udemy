const express = require("express");
// Resource Router single bootcamp  many courses
const courseRouter = require("./course");

const Router = express.Router();

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
Router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
Router.route("/")
  .get(getBootcamps)
  .post(createBootcamp);
Router.route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
Router.route("/:id/photo").put(uploadBootcampPhoto);

module.exports = Router;
