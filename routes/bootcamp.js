const express = require("express");

const Router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require("../controller/bootcamp");
Router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
Router.route("/")
  .get(getBootcamps)
  .post(createBootcamp);
Router.route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = Router;
