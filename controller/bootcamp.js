const Bootcamp = require("../models/Bootcamp");
//@desc  get all bootcamps
//@method   GET /api/v1/bootcamps
//@access   public
exports.getBootcamps = (req, res, next) => {
  res.status(200).send({ name: "P" });
};

//@desc  get specific bootcamp
//@method   GET /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get single bootcamp by ${req.params.id}` });
};
//@desc  Create New bootcamp
//@method   POST /api/v1/bootcamps
//@access   private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).send({ success: false, errormessage: error.message });
  }
};

//@desc  update specific bootcamp
//@method   PUT /api/v1/bootcamps/:id
//@access   private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp by ${req.params.id}` });
};
//@desc  delete specific bootcamp
//@method   PUT /api/v1/bootcamps/:id
//@access   private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp by ${req.params.id}` });
};
