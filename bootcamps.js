const express = require("express");
const router = express.Router();
//show all bootcamps
router.get("/", (req, res) => {
  // res.setHeader()
  res.status(200).send({ status: true, message: "Show all bootcamps" });
});
//create new bootcamp
router.post("/", (req, res) => {
  // res.setHeader()
  res.status(200).send({ status: true, message: "create bootcamp" });
});
//update  bootcamp
router.put("/:id", (req, res) => {
  // res.setHeader()
  res
    .status(200)
    .send({ status: true, message: `Update bootcamp with id${req.params.id}` });
});
//delete bootcamp
router.delete("/:id", (req, res) => {
  // res.setHeader()
  res
    .status(200)
    .send({ status: true, message: `Delete bootcamp ${req.params.id}` });
});
module.exports = router;
