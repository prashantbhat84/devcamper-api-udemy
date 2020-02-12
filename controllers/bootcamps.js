const Bootcamp = require("../models/Bootcamp");

//@desc  Get All Bootcamps
//@route   get /api/v1/bootcamps
//@access  public
exports.getBootcamps = (req, res, next) => {
  res.status(200).send({ status: true, message: "get all bootcamps" });
};

//@desc  Get single Bootcamp
//@route   get /api/v1/bootcamps/:id
//@access  public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .send({ status: true, message: `Get bootcamp by id ${req.params.id}` });
};
//@desc  Create  new Bootcamp
//@route   post /api/v1/bootcamps
//@access  private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).send({ success: false });
  }
};
//@desc  update Bootcamp
//@route   put /api/v1/bootcamps/:id
//@access  private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .send({ status: true, message: `Update bootcamp with id${req.params.id}` });
};
//@desc  Delete  Bootcamp
//@route   post /api/v1/bootcamps/:id
//@access  private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .send({ status: true, message: `Delete bootcamp ${req.params.id}` });
};
