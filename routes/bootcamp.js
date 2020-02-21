const express = require("express");

const Router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require("../controller/bootcamp");
Router.route("/")
  .get(getBootcamps)
  .post(createBootcamp);
Router.route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
Router.get("/:id", (req, res) => {
  console.log(req.param.id);
  res.send({ sucess: true });
});
module.exports = Router;
