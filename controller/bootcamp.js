const Bootcamp = require("../models/Bootcamp");
//@desc  get all bootcamps
//@method   GET /api/v1/bootcamps
//@access   public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc  get specific bootcamp
//@method   GET /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,

      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
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
